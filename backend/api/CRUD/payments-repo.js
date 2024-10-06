import { db } from "../database/db.js";

const payments = db.Payments;

export const paymentsRepo = {
  addPayment,
};

async function addPayment(req, res) {

    const body = req.body;


//Buscar el cli_next_pay_date de ese cliente, y restarle la fecha actual 


}
