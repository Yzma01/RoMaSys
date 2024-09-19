import { db } from "../db.js";

const Client = db.Clients;

export const clientsRepo = {
  getClients,
  addClient,
};

async function getClients(req, res) {
  try {
    const clients = await db.Clients.find(); 
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving clients', error });
  }
}

//!Agrega un cliente
async function addClient(params) {
  await userAlredyExists(params);

  await emailAlredyInUse(params);

  const client = new Client(params);

  await client.save();
}

//? Verificaciones
//!Cliente ya existe
async function userAlredyExists(params) {
  if (await Client.findOne({ cli_id: params.id })) {
    throw {
      message: 'User with ID "' + params.id + '" already exists',
      status: 401,
    };
  }
}

//!Email de cliente ya en uso
async function emailAlredyInUse(params) {
  if (await Client.findOne({ cli_email: params.email })) {
    throw {
      message: 'Email "' + params.email + '" is already in use',
      status: 406,
    };
  }
}
