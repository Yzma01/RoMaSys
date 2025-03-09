import { db } from "../database/db.js";
import { assignRutine, scheduleMessage } from "./services/rutineService.js";
import {
  clientNotFound,
  clientAlredyExists,
  phoneAlredyInUse,
  validatePhone,
  emailAlreadyInUse,
  emailAlreadyInUseForUpdate,
} from "./services/clientValidations.js";
import { calculateNextPayDate } from "./services/clientUtils.js";
import { sendEmail } from "../sendEmail.js";

const Client = db.Clients;
const AdditionalData = db.AdditionalClientData;
const Payment = db.Payments;
const MessageAgenda = db.MessagesAgenda;

const subjectEmail = "Rutina 🏋️‍♀️🏋️‍♂️";
const typeOfEmail = "routine";

export const clientsRepo = {
  _getClients,
  _getClientById,
  _addClient,
  _updateClient,
  _deleteClient,
};

//*Get client by id
async function _getClientById(req, res) {
  const { cli_id } = req.query;
  try {
    console.log("💐💐💐💐💐");
    const client = await Client.findOne({
      cli_id: cli_id,
    });
    clientNotFound(client);
    client.cli_additional_data = await AdditionalData.findOne({
      _id: client.cli_additional_data,
    });
    console.log("🐢🐢🐢🐢🐢🐢🐢", client);
    res.json(client);
  } catch (error) {
    res.status(500).json({ message: "Error getting client" + error.message });
  }
}

//*Get all clients
async function _getClients(req, res) {
  try {
    const clients = await Client.find();

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
async function _addClient(req, res) {
  const body = req.body;
  const today = new Date();
  try {
    await clientAlredyExists(body);
    await phoneAlredyInUse(body);
    try {
      await emailAlreadyInUse(body);
    } catch (error) {
      console.log("❌ Email en uso:", error);
       return res
      .status(error.status)
    }
    body.cli_next_pay_date = calculateNextPayDate(
      body.cli_monthly_payment_type,
      today
    );
    body.cli_register_date = today;

    if (body.cli_rutine === true) {
      const rutine = await assignRutine(body);
      const additionalData = await addAdditionalClientData(
        body.cli_additional_data,
        rutine.rut_id
      );

      await sendEmail(
        subjectEmail,
        body.cli_email,
        body.cli_name,
        rutine.rut_rutine,
        typeOfEmail
      );

      body.cli_additional_data = additionalData._id;
    }

    await addFirstPayment(body);

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

async function addFirstPayment(body) {
  const now = new Date();
  const costaRicaOffset = -6 * 60; // UTC-6 en minutos
  const localTimeToday = new Date(now.getTime() + costaRicaOffset * 60000);

  try {
    const bodyPayment = {
      pay_client_id: body.cli_id,
      pay_date: localTimeToday,
      pay_amount: body.pay_amount.includes(",")
        ? body.pay_amount.replace(",", "")
        : body.pay_amount,
      pay_monthly_payment_type: body.cli_monthly_payment_type,
    };

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
    } else {
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
async function _updateClient(req, res) {
  const { cli_id } = req.query;
  const body = req.body;
  console.log("🚀🚀🚀🚀🚀 ~ _updateClient ~ body:", body)

  try {
    console.log("popopopopopoopoppp");
    const client = await Client.findOne({ cli_id: cli_id });
    console.log("iiiiiiiiiiiiiiiiiiiiiiiiii");
    console.log("🚀 ~ _updateClient ~ client:", client)

    clientNotFound(client);
    console.log("dsadddsdsdsdsdsd");
    await emailAlreadyInUseForUpdate(body, client);

    await validatePhone(body, client);
    console.log("📍📍📍📍📍📍");

    if (body.cli_rutine === true) { //!Revisar si cuando se congela un cliente con rutina se le evia la rutina, podria colocar que cuando sea true no se jecute y si es false se le vuelva a enviar
      
      const rutine = await assignRutine(body);

      const additionalData = await updateAdditionalClientData(
        body.cli_additional_data,
        client.cli_additional_data,
        rutine.rut_id
      );
     
      await sendEmail(
        subjectEmail,
        client.cli_email,
        client.cli_name,
        rutine.rut_rutine,
        typeOfEmail
      );

      body.cli_additional_data = additionalData._id;
    }

    body.cli_register_date = client.cli_register_date;
    body.cli_next_pay_date = client.cli_next_pay_date;

    frozenClient(body, client);
    unfreezeClient(body, client);

    Object.assign(client, body);
    await client.save();

    res.status(200).json({
      message: "Client updated successfully ",
      client,
    });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: "Error updating clients " + error.message });
  }
}

async function updateAdditionalClientData(body, clientObjectId, rutineId) {
  let additionalData = await AdditionalData.findOne({ _id: clientObjectId });

  try {
    if (!additionalData) {
      console.log("looololoololoolol");
      additionalData = await addAdditionalClientData(body, rutineId);
    }

    Object.assign(additionalData, body);
    await additionalData.save();
    return additionalData;
  } catch (error) {
    throw new Error("Error updating additional client data: " + error.message);
  }
}

async function _deleteClient(req, res) {
  const { cli_id } = req.query;
  try {
    const client = await Client.findOne({ cli_id: cli_id });
    clientNotFound(client);

    //*Delete additional data
    if (client.cli_additional_data) {
      await AdditionalData.findByIdAndDelete(client.cli_additional_data);
    }

    // await Payment.deleteMany({ pay_client_id: client.cli_id });

    await MessageAgenda.deleteMany({ msg_client_id: client.cli_id });

    //*Delete client
    await Client.findOneAndDelete({ cli_id: cli_id });
    res.status(200).json({ message: "Client deleted successfully" });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: "Error deleting clients" + error.message });
  }
}
