import { clientsRepo } from "../CRUD/clients-repo.js";

export const getClients = (req, res) => {
  console.log("🐕🐕🐕🐕")
  clientsRepo._getClients(req, res);
};

export const addClient = (req, res) => {
  clientsRepo.addClient(req, res);
};

export const updateClient = (req, res) => {
  
  clientsRepo._updateClient(req, res);
};

export const deleteClient = (req, res) => {
 
  clientsRepo._deleteClient(req, res);
};

export const getClientById = (req, res) => {
  clientsRepo._getClientById(req, res);
}
