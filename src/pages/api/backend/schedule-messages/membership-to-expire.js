import { db } from "../database/db.js";
import { sendEmail } from "../sendEmail.js";

// import { sendEmail } from "../../apiBrevo/sendEmail.js";


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
    const pendingMessages = await MessageAgenda.find({
      msg_sent: false,
      msg_next_payment_date: { $lt: currentDate },
    });
    console.log("Mensajes pendientes: ", pendingMessages);

    if (pendingMessages.length === 0) {
      // console.log("No hay mensajes pendientes.");
      //  setTimeout(() => startMessageSending(), TESTING);
      return;
    }

    for (const message of pendingMessages) {

      let client = await Client.findOne({ cli_id: message.msg_client_id });

      if (client) {
        let clientAdditionalData = await AdditionalClientData.findOne({
          _id: client.cli_additional_data,
        });//!Creo que ya no se ocupa
        await sendAndMarkAsSent(client, clientAdditionalData, message); 
      }
    }
    // await startMessageSending();
  } catch (error) {
    console.error("Error al procesar mensajes programados:", error);
  }
}


async function sendAndMarkAsSent(client, clientAdditionalData, message) {
  console.log(`Enviando mensaje a: ${message.msg_client_id}`);
  try {
   await sendEmail(subjectEmail, client.cli_email, client.cli_name.cli_name, messageToSend, typeOfEmail);

    console.log("Correo enviado con éxito:");
    await MessageAgenda.findOneAndDelete({ _id: message._id });
  
  } catch (error) {
    console.error("Error al enviar mensaje:", error);
  }
}



