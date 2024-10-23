import { makeFetchWhatsapp } from "../../utils/fetchWhatsapp.js";
import { db } from "../database/db.js";
import { authenticated } from "../../apiWhatsApp/lib/whatsapp.js"; //

const MessageAgenda = db.MessagesAgenda;
const Client = db.Clients;
const ONCE_DAY = 86400000;
const TESTING = 10000;


export async function startMessageSending(isConnected) {
  console.log("Estado de conexión: ", isConnected);
  if (!isConnected) {
    console.log("Cliente desconectado, no se enviarán mensajes.");
    return;
  }

  try {
    const currentDate = new Date();
    const pendingMessages = await MessageAgenda.find({
      msg_sent: false,
      msg_next_payment_date: { $lt: currentDate },
    });
    console.log("Mensajes pendientes: ", pendingMessages);

    if (pendingMessages.length === 0) {
      console.log("No hay mensajes pendientes.");
      setTimeout(() => startMessageSending(authenticated), TESTING); 
      return;
    }

    for (const message of pendingMessages) {
      if (!authenticated) {  
        console.log("Cliente desconectado durante el envío. Cancelando...");
        return;
      }

      const client = await Client.findOne({ cli_id: message.msg_client_id });

      if (client) {
        await sendAndMarkAsSent(client, message);
      }
    }
  } catch (error) {
    console.error("Error al procesar mensajes programados:", error);
  }

  if (authenticated) {
    messageInterval = setTimeout(() => startMessageSending(authenticated), TESTING);
  }
}

async function sendAndMarkAsSent(client, message) {
  console.log(`Enviando mensaje a: ${message.msg_client_id}`);
  try {
    const response = await makeFetchWhatsapp(
      "/apiWhatsApp/notifyExpiration",
      "POST",
      "",
      client
    );
    //!Quitar el de modificar y que sea eliminar
    message.msg_sent = true; 
    await message.save();
  } catch (error) {
    console.error("Error al enviar mensaje:", error);
  }
}
