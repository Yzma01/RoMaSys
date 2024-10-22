import { makeFetchWhatsapp } from "../../utils/fetchWhatsapp.js";
import { db } from "../database/db.js";

const MessageAgenda = db.MessagesAgenda;
const Client = db.Clients;

export async function startMessageSending() {
  try {
    console.log("oe mamahuevo k psa?");
    const currentDate = new Date();
    const aux = await MessageAgenda.find();

    const pendingMessages = await MessageAgenda.find({
        msg_sent: false,
        msg_next_payment_date: { $lt: currentDate }, // Busca fechas menores a la actual
      });
    console.log("ayauo: ", pendingMessages);
    if (pendingMessages.length === 0) {
      console.log("No hay mensajes pendientes.");
      setTimeout(startMessageSending, 10000);
      return;
    }

    for (const message of pendingMessages) {
      // Buscar cliente basado en el ID del mensaje
      const client = await Client.findOne({ cli_id: message.msg_client_id });

      if (client) {
        // Enviar el mensaje y marcar como enviado
        await sendAndMarkAsSent(client, message);
      }
    }
  } catch (error) {
    console.error("Error al procesar mensajes programados:", error);
  }

  setTimeout(startMessageSending, 10000);
}

async function sendAndMarkAsSent(client, message) {
  console.log(`Enviando mensaje a: ${message.msg_client_id}`);
  try {
    const response = await makeFetchWhatsapp(
      "/apiMembership/notifyExpiration",
      "POST",
      "",
      client
    );
    // Marcar como enviado
    message.msg_sent = true;
    await message.save();
  } catch (error) {
    console.error("Error al enviar mensaje:", error);
  }
}
