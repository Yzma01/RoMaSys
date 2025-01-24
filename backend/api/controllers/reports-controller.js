import { reportsRepo } from "../CRUD/reports-repo.js";

export const getReport = (req, res) => {
  reportsRepo.basicReport(req, res);
};

export const getIncomingByRange = (req, res) => {
  reportsRepo.incomingByRange(req, res);
};
