import { db } from "../db.js";

const Client = db.Clients;

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
    res.status(500).json({ message: "Error retrieving clients", error });
  }
}

//!Add client
async function addClient(req, res) {
  const body = req.body;

  try {
    await userAlredyExists(body);
    await phoneAlredyInUse(body);

    const client = new Client(body);
    await client.save();

    res.status(201).json({ message: "Client saved!", client });
  } catch (error) {
    res.status(error.status || 500).json({ message: "Error added  clients", error });
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

    Object.assign(client, body);
    await client.save();

    res.status(200).json({ message: "Client updated successfully", client });
  } catch (error) {
    res.status(error.status || 500).json({message: "Error updating clients", error  });
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
      await Client.findOneAndDelete({ cli_id: cli_id });
      res.status(200).json({ message: "Client deleted successfully" });
    
  } catch (error) {
    res.status(error.status || 500).json({message: "Error deleting clients", error });
  }
}

//? Verificaciones

// async function validatePhone(body, client, res) {
//   if (body.cli_phone &&
//     (await Client.findOne({cli_phone: body.cli_phone, _id: { $ne: client._id },}))){
//     return res
//       .status(406)
//       .json({ message: `Phone "${body.cli_phone}" is already in use` });
//   }
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

// //!Email de cliente ya en uso
// async function emailAlredyInUse(params) {
//   if (await Client.findOne({ cli_email: params.email })) {
//     throw {
//       message: 'Email "' + params.email + '" is already in use',
//       status: 406,
//     };
//   }
// }
