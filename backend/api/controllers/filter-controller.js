import { clientsFilter } from "../Filter/clients.js";

export const getClientsByMonthlyType = (req, res) => {
  clientsFilter.getClientsByMonthlyType(req, res);
};
