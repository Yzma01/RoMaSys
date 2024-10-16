import { db } from "../../database/db.js";
import { makeFetchWhatsapp } from "../../../utils/fetchWhatsapp.js";
import { calculateNextPayDate, calculateAge } from "./clientUtils.js";
import { filterByAge, filterByGoal, filterByGender } from "./clientFilters.js";

const Rutine = db.Rutines;
const MessagesAgenda = db.MessagesAgenda;

export async function assignRutine(body) {
  try {
    const additionalData = body.cli_additional_data;
    console.log("adiiiiiiiiiiiiiitional", additionalData);
    let filter = {};

    filterByAge(filter, calculateAge(body));
    filterByGoal(filter, additionalData);
    filterByGender(filter, additionalData);

    const rutine = await Rutine.findOne(filter);

    if (!rutine) {
      return 1;
    }

    return rutine;
  } catch (error) {
    console.error("Error al asignar la rutina:", error);
    throw new Error("No se pudo asignar la rutina");
  }
}

export async function sendRutine(body, rutine) {
  if (body.cli_rutine) {
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

export async function scheduleMessage(body) {
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
