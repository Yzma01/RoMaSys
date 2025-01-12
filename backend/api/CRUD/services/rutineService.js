import { db } from "../../database/db.js";
import { makeFetchWhatsapp } from "../../../utils/fetchWhatsapp.js";
import { calculateAge } from "./clientUtils.js";
import { filterByAge, filterByGoal, filterByGender } from "./clientFilters.js";

const Rutine = db.Rutines;
const MessagesAgenda = db.MessagesAgenda;
const POSTAL_CODE = "+506";

export async function assignRutine(body) { //!Revisar aqui que hacer cuando el men mete una fecha de nacimieto mayor a la actual
  try {
    const additionalData = body.cli_additional_data;
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

export async function sendRutine(body, rutine) { //!Cambiar pora que ahora sea por correo
  if (body.cli_rutine) {
    try {
      const messageData = {
        postalCode: POSTAL_CODE, //!Por ahora esta asi hasta que yzma pase el postal Code, seria body.postal_code
        phones: [body.cli_phone],
        mensaje: rutine,
      };

      const response = await makeFetchWhatsapp(
        "/apiWhatsApp/sendRoutine",
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

export async function scheduleMessage(client) {
  try {
    const data = {
      msg_client_id: client.cli_id,
      msg_sent: false,
      msg_next_payment_date: client.cli_next_pay_date,
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
