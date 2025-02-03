import { makeFetchWhatsapp } from "../../utils/fetchWhatsapp.js";
import { db } from "../database/db.js";
import {
  authenticated,
  setMessageInterval,
  clearMessageInterval,
} from "../../apiWhatsApp/lib/whatsapp.js"; //

import { sendEmail } from "../../apiBrevo/sendEmail.js";

const subjectEmail = "Reminder 📍";
const typeOfEmail = "reminder";
const messageToSend = "Su mesualidad se encuentra vencida";

const MessageAgenda = db.MessagesAgenda;
const Client = db.Clients;
const AdditionalClientData = db.AdditionalClientData;
const ONCE_DAY = 86400000;
const TESTING = 10000;

// xport async function startMessageSending(isConnected) {
export async function startMessageSending() {
  //!Check this function, replace this for email
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
      setTimeout(() => startMessageSending(), TESTING);

      return;
    }

    for (const message of pendingMessages) {
      // if (!authenticated) {
      //   console.log("Cliente desconectado durante el envío. Cancelando...");
      //   return;
      // }

      let client = await Client.findOne({ cli_id: message.msg_client_id });

      if (client) {
        let clientAdditionalData = await AdditionalClientData.findOne({
          _id: client.cli_additional_data,
        });
        await sendAndMarkAsSent(client, clientAdditionalData, message);
      }
    }
    await startMessageSending();
  } catch (error) {
    console.error("Error al procesar mensajes programados:", error);
  }

  // if (authenticated) {
  //   const interval = setTimeout(() => startMessageSending(authenticated), ONCE_DAY);
  //   setMessageInterval(interval); // Usa la función para configurar el intervalo
  // }
}
async function sendAndMarkAsSent(client, clientAdditionalData, message) {
  //! Cahnge this for email
  console.log(`Enviando mensaje a: ${message.msg_client_id}`);
  try {
    // const response = await makeFetchWhatsapp(
    //   "/apiWhatsApp/notifyExpiration",
    //   "POST",
    //   "",
    //   client
    // );

    //!Enviar por email con la funcion de sendEmail

    await sendEmail(
      subjectEmail,
      clientAdditionalData.cli_email,
      client.cli_name,
      messageToSend,
      typeOfEmail
    );

    console.log("Se envio la kk");
    await MessageAgenda.findOneAndDelete({ _id: message._id });
  } catch (error) {
    console.error("Error al enviar mensaje:", error);
  }
}
