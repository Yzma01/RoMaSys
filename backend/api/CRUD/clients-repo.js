import { db } from "../database/db.js";
import {
  assignRutine,
  sendRutine,
  scheduleMessage,
} from "./services/rutineService.js";
import {
  clientNotFound,
  clientAlredyExists,
  phoneAlredyInUse,
  validatePhone,
} from "./services/clientValidations.js";
import { calculateNextPayDate } from "./services/clientUtils.js";

const Client = db.Clients;
const AdditionalData = db.AdditionalClientData;
const Payment = db.Payments;

export const clientsRepo = {
  getClients,
  addClient,
  updateClient,
  _deleteClient,
};

//*Get all clients
async function getClients(req, res) {
  try {
    const clients = await Client.find();
    console.log("cle", clients);

    for (let client of clients) {
      if (client.cli_additional_data) {
        try {
          const additionalData = await AdditionalData.findById(
            client.cli_additional_data
          ).exec();
          client.cli_additional_data = additionalData;
        } catch (err) {
          console.error(
            "Error fetching additional data for client:",
            client._id,
            err.message
          );
        }
      } else {
        console.warn("Client without additional data:", client._id);
      }
    }

    res.json(clients);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving clients" + error.message });
  }
}

//*Add client
async function addClient(req, res) {
  const body = req.body;
  const today = new Date();
  console.log("today", today);
  console.log("El body: ", body);
  try {
    await clientAlredyExists(body);
    await phoneAlredyInUse(body);

    body.cli_next_pay_date = calculateNextPayDate(body.cli_monthly_payment_type);
    console.log("auqi");
    body.cli_register_date = today;

    if (body.cli_rutine === true) {
      const rutine = await assignRutine(body);
      const additionalData = await addAdditionalClientData(
        body.cli_additional_data,
        rutine.rut_id
      );
      console.log("popopopop:", additionalData._id);
      body.cli_additional_data = additionalData._id;

      await sendRutine(body, rutine.rut_rutine);
    }

    console.log("maldito");
    await addFirstPayment(body, today);
    console.log("que psa hp");
    delete body.pay_amount;

    const client = new Client(body);
    await client.save();

    await scheduleMessage(client);

    res.status(201).json({ message: "Client saved!", client });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: "Error added  clients  " + error.message });
  }
}

//*Add additional client data
async function addAdditionalClientData(body, rutineId) {
  body.cli_rutine_id = rutineId;
  try {
    const additionalData = new AdditionalData(body);
    await additionalData.save();
    return additionalData;
  } catch (error) {
    throw {
      message: `Error saving additional client data: " + ${error.message}`,
      status: 400,
    };
  }
}

async function addFirstPayment(body, today) {
  try {
    const bodyPayment = {
      pay_client_id: body.cli_id,
      pay_date: today,
      pay_amount: body.pay_amount.includes(",") ? body.pay_amount.replace(",", "") : body.pay_amount,
      pay_monthly_payment_type: body.cli_monthly_payment_type,
    };
    console.log("bodyPa: ", bodyPayment);
    const payment = new Payment(bodyPayment);
    await payment.save();
  } catch (error) {
    throw {
      message: `Error saving first payment: " + ${error.message}`,
      status: 400,
    };
  }
}

function frozenClient(body, client) {
  if (body.cli_frozen) {
    const today = new Date();
    const nextPayDate = new Date(client.cli_next_pay_date);

    today.setHours(0, 0, 0, 0);
    nextPayDate.setHours(0, 0, 0, 0);

    if (today < nextPayDate) {
      const diferenciaMilisegundos = nextPayDate - today;
      const milisegundosPorDia = 1000 * 60 * 60 * 24;
      body.cli_remaining_days = diferenciaMilisegundos / milisegundosPorDia;
      console.log("Se congelo 🥶");
    } else {
      //!Seria que un cliente con mesualidad vencida intente congelar
      //!ver si dejo el try-catch
      console.log("que paho😷");
      throw {
        message: `Monthly payment due `,
        status: 402,
      };
    }
  }
}

function unfreezeClient(body, client) {
  if (body.cli_frozen === false && body.cli_remaining_days > 0) {
    try {
      const today = new Date();
      today.setDate(today.getDate() + client.cli_remaining_days);
      body.cli_next_pay_date = today;
      body.cli_remaining_days = 0;
    } catch (error) {
      throw {
        message: `Error unfreeze client`,
        status: 400,
      };
    }
  }
}

//*Update client
async function updateClient(req, res, cli_id) {
  const body = req.body;

  try {
    const client = await Client.findOne({ cli_id: cli_id });
    clientNotFound(client);

    await validatePhone(body, client);

    const rutine = await assignRutine(body);

    const additionalData = await updateAdditionalClientData(
      body.cli_additional_data,
      client.cli_additional_data,
      rutine.rut_id
    );

    body.cli_additional_data = additionalData._id;
    body.cli_register_date = client.cli_register_date;
    body.cli_next_pay_date = calculateNextPayDate(body.cli_monthly_payment_type);

    frozenClient(body, client);

    unfreezeClient(body, client);

    Object.assign(client, body);
    await client.save();

    await sendRutine(body, rutine.rut_rutine);

    res.status(200).json({
      message: "Client updated successfully ",
      client,
      additionalData,
    });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: "Error updating clients " + error.message });
  }
}

async function updateAdditionalClientData(body, clientObjectId, rutineId) {
  const additionalData = await AdditionalData.findOne({ _id: clientObjectId });

  if (!additionalData) {
    return;
  }

  body.cli_rutine_id = rutineId;

  try {
    Object.assign(additionalData, body);
    await additionalData.save();
    return additionalData;
  } catch (error) {
    throw new Error("Error updating additional client data: " + error.message);
  }
}

async function _deleteClient(req, res, cli_id) {
  try {
    const client = await Client.findOne({ cli_id: cli_id });
    clientNotFound(client);

    //*Delete additional data
    if (client.cli_additional_data) {
      await AdditionalData.findByIdAndDelete(client.cli_additional_data);
    }

    //*Delete client
    await Client.findOneAndDelete({ cli_id: cli_id });
    res.status(200).json({ message: "Client deleted successfully" });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: "Error deleting clients" + error.message });
  }
}
