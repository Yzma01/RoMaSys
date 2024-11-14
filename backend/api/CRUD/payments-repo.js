import { db } from "../database/db.js";
import { clientNotFound } from "./services/clientValidations.js";
import { calculateNextPayDate } from "./services/clientUtils.js";
import { scheduleMessage } from "./services/rutineService.js";

const Payment = db.Payments;
const Client = db.Clients;

export const paymentsRepo = {
  addPayment,
  getPayment,
};

//!Si el men hace 3 pagos a esa persona y es de mes, se debe de sumar los 3 meses
async function addPayment(req, res) {
  const body = req.body;

  try {
    const client = await Client.findOne({ cli_id: body.pay_client_id });
    clientNotFound(client);

    console.log("holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa🐢🐢🐢")

    body.pay_date = new Date();
    body.pay_amount = body.pay_amount.includes(",")
      ? body.pay_amount.replace(",", "")
      : body.pay_amount;

    const payment = new Payment(body);
    await payment.save();

    const nextPayDate = calculateNextPayDate(
      body.pay_monthly_payment_type,
      client.cli_next_pay_date
    );
    console.log("Nueva fecha de pago calculada: ", nextPayDate);

    client.cli_next_pay_date = nextPayDate;

    console.log(client);

    await Client.findByIdAndUpdate(client._id, { cli_next_pay_date: nextPayDate });

    await scheduleMessage(client);

    res.status(200).json({ message: "Payment saved!", payment });
  } catch (error) {
    res
      .status(error.status || 403)
      .json({ message: "Error adding payment: " + error.message });
  }
}

async function getPayment(req, res, pay_client_id) {
  try {
    const payment = await Payment.find({ pay_client_id: pay_client_id });
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
