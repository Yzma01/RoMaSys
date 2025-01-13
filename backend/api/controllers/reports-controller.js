import { reportsRepo } from "../CRUD/reports-repo";

export const getReport = (req, res) => {
  reportsRepo.getReport(req, res);
};
