import { db } from "../database/db.js";

const Client = db.Clients;
const OVERDUE = "vencido";
const MONTHLY_TYPE = ["mes", "quincena", "dia"];
const FROZEN = true;

export const clientsFilter = {
  getClientsByMonthlyType,
};

async function getClientsByMonthlyType(req, res) {
  const { filterType } = req.query;

  try {
    let filter = {};

    filter.filterByOverdue(filterType);

    filter.filterByMonthlyType(filterType);

    filter.filterByClientFrozen(filterType);

    const clients = await Client.find(filter);
    console.log(clients);
    res.json(clients);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving clients" + error.message });
  }
}

function filterByOverdue(filterType) {
  if (filterType === OVERDUE) {
    const currentDate = new Date();
    return (cli_next_pay_date = { $lt: currentDate });
  }
}

function filterByMonthlyType(filterType) {
  if (
    filterType === MONTHLY_TYPE[0] ||
    filterType === MONTHLY_TYPE[1] ||
    filterType === MONTHLY_TYPE[2]
  ) {
    return (cli_monthly_payment_type = filterType); //*Isma pase mes,quincena, o dia
  }
}

function filterByClientFrozen(filterType) {
  if (filterType === FROZEN || filterType === !FROZEN) {
    return (cli_frozen = filterType); //*Isma pase true o false
  }
}
