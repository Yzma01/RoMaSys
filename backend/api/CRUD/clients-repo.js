import { db } from "../db.js";
import { makeFetchWhatsapp } from "../../utils/fetchWhatsapp.js";

const Client = db.Clients;
const AdditionalData = db.AdditionalClientData;
const Rutine = db.Rutines;
const MALE = "masculino";
const FEMALE = "femenino";

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
    (currentDate.getMonth() === birthdate.getMonth() &&
      currentDate.getDate() < birthdate.getDate())
  ) {
    age--;
  }

  return age;
}

function filterByAge(filter, age) {
  filter.rut_min_age = { $lte: age };
  filter.rut_max_age = { $gte: age };
}

function filterByGoal(filter, additionalData) {
  filter.rut_goal = additionalData.cli_goal;
}

function filterByGender(filter, additionalData) {
  filter.rut_gender =
    additionalData.cli_gender === MALE ||
    additionalData.cli_gender === FEMALE
      ? additionalData.cli_gender
      : MALE;
}

async function assignRutine(body) {
  const additionalData = body.cli_additional_data;
  let filter = {};

  filterByAge(filter, calculateAge(body));

  filterByGoal(filter, additionalData);

  filterByGender(filter, additionalData);

  const rutine = await Rutine.findOne(filter);

  if (!rutine) {
    return 1; //!Podemos colocar alguna que sea general que sea la 1 en caso de que no se encuentre alguna
  }

  return rutine;
}

async function sendRutine(body, rutine) {
  const messageData = {
    postalCode: "+506", //!Por ahora esta asi hasta que yzma pase el postal Code, seria body.postal_code
    phones: [body.cli_phone],
    mensaje: rutine,
  };

  const response = await makeFetchWhatsapp(
    "/apiWhatsApp/routes/enviarMensaje",
    "POST",
    "",
    messageData
  );

  const status = response.status === 200 ? 200 : 404; //! Eviar a izma un codigo de error cuando el numero no fue encontrado , para que lo muestre en pantalla y se den cuanta de ir a modificar el numero en el update cliente (posible)
  console.log("Se envio el mensaje?:  ", response.status);
}

//*Add client
async function addClient(req, res) {
  const body = req.body;

  try {
    await clientAlredyExists(body);
    await phoneAlredyInUse(body);

    const rutine = await assignRutine(body);
    console.log("Rutina ✅😇", rutine);

    const additionalData = await addAdditionalClientData(
      body.cli_additional_data,
      rutine.rut_id
    );
    body.cli_additional_data = additionalData._id;

    const client = new Client(body);
    await client.save();

    await sendRutine(body, rutine.rut_rutine);

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
    clientNotFound(client);

    await validatePhone(body, client);

    const rutine = await assignRutine(body);

    const additionalData = await updateAdditionalClientData(
      body.cli_additional_data,
      client.cli_additional_data,
      rutine.rut_id
    );

    body.cli_additional_data = additionalData._id;

    Object.assign(client, body);
    await client.save();

    await sendRutine(body, rutine.rut_rutine);

    res
      .status(200)
      .json({ message: "Client updated successfully", client, additionalData });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: "Error updating clients" + error.message });
  }
}

async function updateAdditionalClientData(body, clientObjectId, rutineId) {
  const additionalData = await AdditionalData.findOne({ _id: clientObjectId });

  if (!additionalData) {
    return;
  }

  body.cli_rutine_id = rutineId;

  try {
    Object.assign(additionalData, body);
    await additionalData.save();
    return additionalData;
  } catch (error) {
    throw new Error("Error updating additional client data: " + error.message);
  }
}

async function _deleteClient(req, res) {
  const cli_id = req.params.cli_id;
  try {
    const client = await Client.findOne({ cli_id: cli_id });
    clientNotFound(client);

    //*Delete additional data
    if (client.cli_additional_data) {
      await AdditionalData.findByIdAndDelete(client.cli_additional_data);
    }

    //*Delete client
    await Client.findOneAndDelete({ cli_id: cli_id });
    res.status(200).json({ message: "Client deleted successfully" });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: "Error deleting clients" + error.message });
  }
}

//? Verificaciones

function clientNotFound(client) {
  if (!client) {
    throw {
      message: `"Client not found :(`,
      status: 404,
    };
  }
}

async function clientAlredyExists(body) {
  if (await Client.findOne({ cli_id: body.cli_id })) {
    throw {
      message: 'User with ID "' + body.cli_id + '" already exists',
      status: 401,
    };
  }
}

async function phoneAlredyInUse(body) {
  if (await Client.findOne({ cli_phone: body.cli_phone })) {
    throw {
      message: 'Phone "' + body.cli_phone + '" is already in use',
      status: 406,
    };
  }
}

async function validatePhone(body, client) {
  if (
    body.cli_phone &&
    (await Client.findOne({
      cli_phone: body.cli_phone,
      _id: { $ne: client._id },
    }))
  ) {
    throw {
      message: `Phone "${body.cli_phone}" is already in use`,
      status: 406,
    };
  }
}
