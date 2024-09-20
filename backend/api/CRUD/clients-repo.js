import { db } from "../db.js";

const Client = db.Clients;
const AdditionalData = db.AdditionalClientData;

export const clientsRepo = {
  getClients,
  addClient,
  updateClient,
  _deleteClient,
};

//!Get all clients
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

//!Add client
async function addClient(req, res) {
  const body = req.body;

  try {
    await userAlredyExists(body);
    await phoneAlredyInUse(body);

    //!Camnbiar esto, debe de ser la ruitna que le coreresponda al cliente segun las necesidaes
    const rutineId = 1;

    const additionalData = await addAdditionalClientData(body, rutineId);
    body.cli_additionalData = additionalData._id;

    const client = new Client(body);
    await client.save();

    res.status(201).json({ message: "Client saved!", client, additionalData });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: "Error added  clients  " + error.message });
  }
}

//!Add additional client data
async function addAdditionalClientData(body, rutineId) {
  const data = {
    cli_rutine_id: rutineId,
    cli_goals: body.cli_goals,
    cli_gender: body.cli_gender,
    cli_height: body.cli_height,
    cli_weight: body.cli_weight,
    cli_birthdate: body.cli_birthdate,
  };
  try {
    const additionalData = new AdditionalData(data);
    await additionalData.save();
    return additionalData;
  } catch (error) {
    throw new Error("Error saving additional client data: " + error.message);
  }
}

//!Update client
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

    const additionalData = await updateAdditionalClientData(
      body,
      client.cli_additionalData,
      rutineId
    );

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

//!Update additional client data
async function updateAdditionalClientData(body, clientId, rutineId) {
  const additionalData = await AdditionalData.findOne({ _id: clientId });

  if (!additionalData) {
    return;
  }

  const data = {
    cli_rutine_id: rutineId,
    cli_goals: body.cli_goals,
    cli_gender: body.cli_gender,
    cli_height: body.cli_height,
    cli_weight: body.cli_weight,
    cli_birthdate: body.cli_birthdate,
  };
  try {
    Object.assign(additionalData, data);
    await additionalData.save();
    return additionalData;
  } catch (error) {
    throw new Error("Error updating additional client data: " + error.message);
  }
}

//!Delete client
async function _deleteClient(req, res) {
  const cli_id = req.params.cli_id;
  try {
    const client = await Client.findOne({ cli_id: cli_id });
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }

    if (client.cli_additionalData) {
      await AdditionalData.findByIdAndDelete(client.cli_additionalData);
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

//!Client alredy exists
async function userAlredyExists(body) {
  if (await Client.findOne({ cli_id: body.cli_id })) {
    throw {
      message: 'User with ID "' + body.cli_id + '" already exists',
      status: 401,
    };
  }
}

//!Client phone alredy in use
async function phoneAlredyInUse(body) {
  if (await Client.findOne({ cli_phone: body.cli_phone })) {
    throw {
      message: 'Phone "' + body.cli_phone + '" is already in use',
      status: 406,
    };
  }
}
