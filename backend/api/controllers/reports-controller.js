import { reportsRepo } from "../CRUD/reports-repo.js";

export const getReport = (req, res) => {
  reportsRepo.getBasicReport(req, res);
};
