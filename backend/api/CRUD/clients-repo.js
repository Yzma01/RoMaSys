import { db } from "../db.js";

const Client = db.Clients;
const AdditionalData = db.AdditionalClientData;
const Rutine = db.Rutines;

export const clientsRepo = {
  getClients,
  addClient,
  updateClient,
  _deleteClient,
};

//*Get all clients
async function getClients(req, res) {
  try {
    const clients = await db.Clients.find();
    res.json(clients);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving clients" + error.message });
  }
}

function calculateAge(body) {
  const currentDate = new Date();
  const birthdate = new Date(body.cli_additional_data.cli_birthdate);
  
  let age = currentDate.getFullYear() - birthdate.getFullYear();
  
  if (
    currentDate.getMonth() < birthdate.getMonth() || 
    (currentDate.getMonth() === birthdate.getMonth() && currentDate.getDate() < birthdate.getDate())
  ) {
    age--;
  }
  
  return age;
}

async function assignRutine(body) {
  console.log("asingRuntine")

  const additionalData = body.cli_additional_data;
  let filter = {};

  const age = calculateAge(body);
  console.log("edasd:" , age);
  filter.rut_min_age = { $lte: age };
  filter.rut_max_age = { $gte: age };

  filter.rut_goal = additionalData.cli_goal;

  filter.rut_gender = (additionalData.cli_gender === "masculino" || additionalData.cli_gender === "femenino") 
                      ? additionalData.cli_gender 
                      : "masculino"; //! Que coman mierdaaaaaaa las vacas

  console.log("El filtro: " , filter);

  const rutineId = await Rutine.findOne(filter);

  if (!rutineId) {
    console.log("No hay rutine");
    console.log(rutineId);
    return null; //!Podemos colocar alguna que sea general que sea la 1 en caso de que no se encuentre alguna
  }

  return rutineId.rut_id;
}

//*Add client
async function addClient(req, res) {
  const body = req.body;

  try {
    await userAlredyExists(body);
    await phoneAlredyInUse(body);

    const rutineId = await assignRutine(body);
    console.log("Rutina ✅😇" , rutineId)

    const additionalData = await addAdditionalClientData(
      body.cli_additional_data,
      rutineId
    );
    body.cli_additional_data = additionalData._id;

    const client = new Client(body);
    await client.save();

    res.status(201).json({ message: "Client saved!", client, additionalData });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: "Error added  clients  " + error.message });
  }
}

//*Add additional client data
async function addAdditionalClientData(body, rutineId) {
  body.cli_rutine_id = rutineId;
  try {
    const additionalData = new AdditionalData(body);
    await additionalData.save();
    return additionalData;
  } catch (error) {
    throw new Error("Error saving additional client data: " + error.message);
  }
}

//*Update client
async function updateClient(req, res) {
  const cli_id = req.params.cli_id;
  const body = req.body;

  try {
    const client = await Client.findOne({ cli_id: cli_id });
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    if (
      body.cli_phone &&
      (await Client.findOne({
        cli_phone: body.cli_phone,
        _id: { $ne: client._id },
      }))
    ) {
      return res
        .status(406)
        .json({ message: `Phone "${body.cli_phone}" is already in use` });
    }
    //!Cambiaaaaaaaaaaar cuando este lo de rutina
    const rutineId = 1;
    console.log("aaaaaaaaaaaaaa:", client.cli_additional_data);
    const additionalData = await updateAdditionalClientData(
      body.cli_additional_data,
      client.cli_additional_data,
      rutineId
    );

    body.cli_additional_data = additionalData._id;

    Object.assign(client, body);
    await client.save();

    res
      .status(200)
      .json({ message: "Client updated successfully", client, additionalData });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: "Error updating clients" + error.message });
  }
}

//*Update additional client data
async function updateAdditionalClientData(body, clientObjectId, rutineId) {
  const additionalData = await AdditionalData.findOne({ _id: clientObjectId });
  console.log("dnfjsdf", additionalData);
  if (!additionalData) {
    return;
  }

  body.cli_rutine_id = rutineId;
  console.log("lknfidncdn: ", body);
  try {
    Object.assign(additionalData, body);
    await additionalData.save();
    return additionalData;
  } catch (error) {
    throw new Error("Error updating additional client data: " + error.message);
  }
}

//*Delete client
async function _deleteClient(req, res) {
  const cli_id = req.params.cli_id;
  try {
    const client = await Client.findOne({ cli_id: cli_id });
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    if (client.cli_additional_data) {
      await AdditionalData.findByIdAndDelete(client.cli_additional_data);
    }

    await Client.findOneAndDelete({ cli_id: cli_id });
    res.status(200).json({ message: "Client deleted successfully" });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: "Error deleting clients" + error.message });
  }
}

//? Verificaciones

// async function validatePhone(body, client) {
//   if (body.cli_phone &&
//     (await Client.findOne({cli_phone: body.cli_phone, _id: { $ne: client._id },}))){
//     return true
//   }
//   return false;
// }

//*Client alredy exists
async function userAlredyExists(body) {
  if (await Client.findOne({ cli_id: body.cli_id })) {
    throw {
      message: 'User with ID "' + body.cli_id + '" already exists',
      status: 401,
    };
  }
}

//*Client phone alredy in use
async function phoneAlredyInUse(body) {
  if (await Client.findOne({ cli_phone: body.cli_phone })) {
    throw {
      message: 'Phone "' + body.cli_phone + '" is already in use',
      status: 406,
    };
  }
}
