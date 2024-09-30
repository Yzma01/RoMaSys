import { db } from "../db.js";

const Client = db.Clients;
const OVERDUE = "vencido";

export const clientsFilter = {
  getClientsByMonthlyType,
};

async function getClientsByMonthlyType(req, res) {
    const { filterType } = req.query;
 
  try {
    let filter = {};

    if (filterType != OVERDUE) {
      filter.cli_monthly_payment_type = filterType;
    }else{
        const currentDate = new Date();
        filter.cli_next_pay_date = { $lt: currentDate }; //*$lt: signifa menor que
    }

    const clients = await Client.find(filter);
    console.log(clients);
    res.json(clients);
      } catch (error) {
        res
          .status(500)
          .json({ message: "Error retrieving clients" + error.message });
      }

}
