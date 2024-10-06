import { db } from "../database/db.js";
import { makeFetchWhatsapp } from "../../utils/fetchWhatsapp.js";

const Client = db.Clients;
const AdditionalData = db.AdditionalClientData;
const Rutine = db.Rutines;
const MessagesAgenda = db.MessagesAgenda;
const GENDERS = ["masculino", "femenino"];
const MONTHLY_PAYMENT_TYPE = ["mes", "quincena", "dia"];

export const clientsRepo = {
  getClients,
  addClient,
  updateClient,
  _deleteClient,
};

//*Get all clients
async function getClients(req, res) {
  try {
    const clients = await db.Clients.find();
    res.json(clients);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving clients" + error.message });
  }
}

function calculateAge(body) {
  const currentDate = new Date();
  const birthdate = new Date(body.cli_additional_data.cli_birthdate);

  let age = currentDate.getFullYear() - birthdate.getFullYear();

  if (
    currentDate.getMonth() < birthdate.getMonth() ||
    (currentDate.getMonth() === birthdate.getMonth() &&
      currentDate.getDate() < birthdate.getDate())
  ) {
    age--;
  }

  return age;
}

function filterByAge(filter, age) {
  filter.rut_min_age = { $lte: age };
  filter.rut_max_age = { $gte: age };
}

function filterByGoal(filter, additionalData) {
  filter.rut_goal = additionalData.cli_goal;
}

function filterByGender(filter, additionalData) {
  filter.rut_gender =
    additionalData.cli_gender === GENDERS[0] ||
    additionalData.cli_gender === GENDERS[1]
      ? additionalData.cli_gender
      : GENDERS[0];
}

async function assignRutine(body) {
  const additionalData = body.cli_additional_data;
  let filter = {};
  console.log("que es?");
  filterByAge(filter, calculateAge(body));
  console.log("mose");
  filterByGoal(filter, additionalData);
  console.log("toy loccco");
  filterByGender(filter, additionalData);

  const rutine = await Rutine.findOne(filter);

  if (!rutine) {
    return 1; //!Podemos colocar alguna que sea general que sea la 1 en caso de que no se encuentre alguna
  }

  return rutine;
}

async function sendRutine(body, rutine) {
  if (body.cli_rutine === true) {
    try {
      const messageData = {
        postalCode: "+506", //!Por ahora esta asi hasta que yzma pase el postal Code, seria body.postal_code
        phones: [body.cli_phone],
        mensaje: rutine,
      };

      const response = await makeFetchWhatsapp(
        "/apiWhatsApp/routes/enviarMensaje",
        "POST",
        "",
        messageData
      );
      //Todo: Luego probar otro throw pa este caso
      const status = response.status === 200 ? 200 : 404; //! Eviar a izma un codigo de error cuando el numero no fue encontrado , para que lo muestre en pantalla y se den cuanta de ir a modificar el numero en el update cliente (posible)
      console.log("Se envio el mensaje?:  ", response.status);
    } catch (error) {
      throw {
        message: `Error sending message: ${error.message}`,
        status: 408,
      };
    }
  }
}

function calculateNextPayDate(body) {
  let today = new Date();
  let nextPaymentDate = new Date(today);

  if (body.cli_monthly_payment_type === MONTHLY_PAYMENT_TYPE[0]) {
    nextPaymentDate.setDate(today.getDate() + 30);
  }
  if (body.cli_monthly_payment_type === MONTHLY_PAYMENT_TYPE[1]) {
    nextPaymentDate.setDate(today.getDate() + 15);
  }
  if (body.cli_monthly_payment_type === MONTHLY_PAYMENT_TYPE[2]) {
    nextPaymentDate.setDate(today.getDate() + 1);
  }

  return nextPaymentDate;
}

async function scheduleMessage(body) {
  try {
    const data = {
      msg_client_id: body.cli_id,
      msg_sent: false,
      msg_next_payment_date: calculateNextPayDate(body),
    };
    const messagesAgenda = new MessagesAgenda(data);
    await messagesAgenda.save();
  } catch (error) {
    throw {
      message: `Error schedule message: ${error.message}`,
      status: 428,
    };
  }
}

//*Add client
async function addClient(req, res) {
  const body = req.body;
  const today = new Date();

  console.log(body); //!quitar
  try {
    await clientAlredyExists(body);
    await phoneAlredyInUse(body);

    body.cli_next_pay_date = calculateNextPayDate(body);
    body.cli_register_date = today;

    if (body.cli_rutine === true) {
      const rutine = await assignRutine(body);
      const additionalData = await addAdditionalClientData(
        body.cli_additional_data,
        rutine.rut_id
      );
      body.cli_additional_data = additionalData._id;
      await sendRutine(body, rutine.rut_rutine); //!Si falla al enviar la rutina es porque iba despues de guardar cliente
    }

    const client = new Client(body);
    await client.save();

    await scheduleMessage(body);

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
  //const cli_id = req.params.cli_id;
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
    body.cli_next_pay_date = calculateNextPayDate(body); //!Tambien se podria quitar para no esperarlo, pero quiza es mejo que quede para escabilidad

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
  //const cli_id = req.params.cli_id;
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

//? Verificaciones

function clientNotFound(client) {
  if (!client) {
    throw {
      message: `"Client not found :(`,
      status: 404,
    };
  }
}

async function clientAlredyExists(body) {
  if (await Client.findOne({ cli_id: body.cli_id })) {
    throw {
      message: 'User with ID "' + body.cli_id + '" already exists',
      status: 401,
    };
  }
}

async function phoneAlredyInUse(body) {
  if (await Client.findOne({ cli_phone: body.cli_phone })) {
    throw {
      message: 'Phone "' + body.cli_phone + '" is already in use',
      status: 406,
    };
  }
}

async function validatePhone(body, client) {
  if (
    body.cli_phone &&
    (await Client.findOne({
      cli_phone: body.cli_phone,
      _id: { $ne: client._id },
    }))
  ) {
    throw {
      message: `Phone "${body.cli_phone}" is already in use`,
      status: 406,
    };
  }
}
