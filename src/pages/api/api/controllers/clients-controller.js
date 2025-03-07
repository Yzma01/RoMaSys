import { clientsRepo } from "../CRUD/clients-repo.js";

export const getClients = (req, res) => {
  console.log("🐕🐕🐕🐕")
  clientsRepo._getClients(req, res);
};

export const addClient = (req, res) => {
  clientsRepo._addClient(req, res);
};

export const updateClient = (req, res, cli_id) => {
  
  clientsRepo._updateClient(req, res, cli_id);
};

export const deleteClient = (req, res, cli_id) => {
 
  clientsRepo._deleteClient(req, res, cli_id);
};

export const getClientById = (req, res, cli_id) => {
  console.log("byId", cli_id);
  clientsRepo._getClientById(req, res, cli_id);
}
