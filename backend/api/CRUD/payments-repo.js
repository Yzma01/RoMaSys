import { Payment } from "@mui/icons-material";
import { db } from "../database/db.js";

const payments = db.Payments;

const Client = db.Clients;

export const paymentsRepo = {
  addPayment,
  getPayment,
};

async function addPayment(req, res) {
  const body = req.body;

  try {
    const client = await Client.findOne({ cli_id: body.cli_id });
    // clientNotFound(client);//!Esta verificacion esta en cleints-repo, tengo que sacarla para reutilizarla aqui

    body.pay_date = new Date();

    const payment = new Payment(body);
    await payment.save();
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: "Error added payment  " + error.message });
  }

  //Buscar el cli_next_pay_date de ese cliente, y restarle la fecha actual
}

async function getPayment(req, res) {
  const body = req.body;

  try {
    const payment = await Payment.findOne({ cli_id: body.cli_id });
    paymentNotFound(payment);

    res.json(payment);
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: "Error getting payment  " + error.message });
  }
}

//? Verificaciones

function paymentNotFound(payment) {
  if (!payment) {
    throw {
      message: `"Payment not found`,
      status: 404,
    };
  }
}
