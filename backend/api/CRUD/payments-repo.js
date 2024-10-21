import { db } from "../database/db.js";
import { clientNotFound } from "./services/clientValidations.js";
  
const Payment = db.Payments;
const Client = db.Clients;

export const paymentsRepo = {
  addPayment,
  getPayment,
};

async function addPayment(req, res) {
  const body = req.body;

  try {
    const client = await Client.findOne({ cli_id: body.pay_client_id });
    clientNotFound(client);
    
    body.pay_date = new Date();

    const payment = new Payment(body);
    await payment.save();

    res.status(201).json({ message: "Payment saved!", payment });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: "Error added payment  " + error.message });
  }
}

async function getPayment(req, res, pay_client_id) {

  try {
    const payment = await Payment.find({ pay_client_id: pay_client_id });
    console.log("payment:", payment);
    paymentNotFound(payment);

    res.json(payment);
  } catch (error) {   
    res
      .status(error.status || 500)
      .json({ message: "Error getting payment  " + error.message });
  }
}

//? Verificaciones payments

function paymentNotFound(payment) {
  if (!payment.length) {
    throw {
      message: `Payment not found`,
      status: 404,
    };
  }
}
