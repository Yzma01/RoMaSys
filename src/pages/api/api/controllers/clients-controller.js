import { clientsRepo } from "../CRUD/clients-repo.js";

export const getClients = (req, res) => {
  console.log("🐕🐕🐕🐕")
  clientsRepo.getClients(req, res);
};

export const addClient = (req, res) => {
  clientsRepo.addClient(req, res);
};

export const updateClient = (req, res) => {
  const { cli_id } = req.params;
  clientsRepo.updateClient(req, res, cli_id);
};

export const deleteClient = (req, res) => {
  const { cli_id } = req.params;
  clientsRepo._deleteClient(req, res, cli_id);
};

export const getClientById = (req, res) => {
  console.log("byId", cli_id);
  const { cli_id } = req.params;
  clientsRepo.getClientById(req, res, cli_id);
}
