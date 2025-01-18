import { makeFetchWhatsapp } from "../../utils/fetchWhatsapp.js";
import { db } from "../database/db.js";
import { authenticated, setMessageInterval, clearMessageInterval } from "../../apiWhatsApp/lib/whatsapp.js"; //

const MessageAgenda = db.MessagesAgenda;
const Client = db.Clients;
const ONCE_DAY = 86400000;
const TESTING = 10000;

// xport async function startMessageSending(isConnected) {
export async function startMessageSending() { //!Check this function, replace this for email
  // console.log("Estado de conexión: ", isConnected);
  // if (!isConnected) {
  //   console.log("Cliente desconectado, no se enviarán mensajes.");
  //   return;
  // }

  try {
    const currentDate = new Date();
    const pendingMessages = await MessageAgenda.find({
      msg_sent: false,
      msg_next_payment_date: { $lt: currentDate },
    });
    console.log("Mensajes pendientes: ", pendingMessages);

    if (pendingMessages.length === 0) {
      console.log("No hay mensajes pendientes.");
      // setTimeout(() => startMessageSending(authenticated), ONCE_DAY); 
      setTimeout(() => startMessageSending(), ONCE_DAY); 

      return;
    }

    for (const message of pendingMessages) {
      // if (!authenticated) {  
      //   console.log("Cliente desconectado durante el envío. Cancelando...");
      //   return;
      // }

      const client = await Client.findOne({ cli_id: message.msg_client_id });

      if (client) {
        await sendAndMarkAsSent(client, message);
      }
    }
  } catch (error) {
    console.error("Error al procesar mensajes programados:", error);
  }

  // if (authenticated) {
  //   const interval = setTimeout(() => startMessageSending(authenticated), ONCE_DAY);
  //   setMessageInterval(interval); // Usa la función para configurar el intervalo
  // }
}
async function sendAndMarkAsSent(client, message) { //! Cahnge this for email
  console.log(`Enviando mensaje a: ${message.msg_client_id}`);
  try {
    // const response = await makeFetchWhatsapp(
    //   "/apiWhatsApp/notifyExpiration",
    //   "POST",
    //   "",
    //   client
    // );

    //!Enviar por email con la funcion de sendEmail

    console.log("si el da un estado de OK, borrar de la agenda")
    await MessageAgenda.findOneAndDelete({ _id: message._id});

  } catch (error) {
    console.error("Error al enviar mensaje:", error); 
  }
}
