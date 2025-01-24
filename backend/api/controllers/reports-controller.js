import { reportsRepo } from "../CRUD/reports-repo.js";

export const getReport = (req, res) => {
  reportsRepo.basicReport(req, res);
};

export const getGainsByRange = (req, res) => {
  reportsRepo.gainsByRange(req, res);
};
