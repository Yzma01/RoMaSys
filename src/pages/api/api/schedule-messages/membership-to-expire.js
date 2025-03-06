import { db } from "../database/db.js";

// import { sendEmail } from "../../apiBrevo/sendEmail.js";
import sendEmail from "../sendEmail.js"

const subjectEmail = "Reminder 📍";
const typeOfEmail = "reminder";
const messageToSend = "Su mesualidad se encuentra vencida";

const MessageAgenda = db.MessagesAgenda;
const Client = db.Clients;
const AdditionalClientData = db.AdditionalClientData;
const ONCE_DAY = 86400000;
const TESTING = 10000;

export async function startMessageSending() {

  try {
    const currentDate = new Date();
    const pendingMessages = await MessageAgenda.find({ //!Esto mas bien se debe de buscar en la proxima fecha de pago del cliente
      msg_sent: false,
      msg_next_payment_date: { $lt: currentDate },
    });
    console.log("Mensajes pendientes: ", pendingMessages);

    if (pendingMessages.length === 0) {
      console.log("No hay mensajes pendientes.");
      setTimeout(() => startMessageSending(), ONCE_DAY);

      return;
    }

    for (const message of pendingMessages) {

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
}


async function sendAndMarkAsSent(client, clientAdditionalData, message) {
  console.log(`Enviando mensaje a: ${message.msg_client_id}`);
  try {
    const response = await fetch("https://ro-ma-sys-server.vercel.app/api/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject: "Reminder 📍",
        clientEmail: client.cli_email,
        clientName: client.cli_name,
        content: "Su mensualidad se encuentra vencida",
        typeOfEmail: "reminder",
      }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log("Correo enviado con éxito:", data);
      await MessageAgenda.findOneAndDelete({ _id: message._id });
    } else {
      console.error("Error al enviar el correo:", data);
    }
  } catch (error) {
    console.error("Error al enviar mensaje:", error);
  }
}



