import { db } from "../database/db.js";

const Client = db.Clients;
const OVERDUE = "vencido";
const MONTHLY_TYPE = ["mes", "quincena", "dia"];
const FROZEN = "congelado";

export const clientsFilter = {
  _getClientsByMonthlyType,
};

async function _getClientsByMonthlyType(req, res) {
  const { filterType } = req.query;
  console.log("hola", filterType)
  try {
    let filter = {
      ...filterByOverdue(filterType),
      ...filterByMonthlyType(filterType),
      ...filterByClientFrozen(filterType),
    };

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
    return {cli_next_pay_date: { $lt: currentDate }};
  }
}

function filterByMonthlyType(filterType) {
  if (
    filterType === MONTHLY_TYPE[0] ||
    filterType === MONTHLY_TYPE[1] ||
    filterType === MONTHLY_TYPE[2]
  ) {
    return {cli_monthly_payment_type: filterType}; //*Isma pase mes,quincena, o dia
  }
}

function filterByClientFrozen(filterType) {
  if (filterType === FROZEN) {
    return {cli_frozen: true}; //*Isma pase true o false
  }
}
