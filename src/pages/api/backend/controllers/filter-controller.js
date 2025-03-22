import { clientsFilter } from "../Filter/clients.js";

export const getClientsByMonthlyType = (req, res) => {
  clientsFilter._getClientsByMonthlyType(req, res);
};
