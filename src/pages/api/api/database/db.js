import mongoose from "mongoose";
import { config } from 'dotenv';

config(); // Carga las variables de entorno

import { Models } from "./models.js";

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log(" ✅ Successful connection to the database");
  })
  .catch((error) => {
    console.error(" ❌ Error connecting to the database:", error);
  });

mongoose.Promise = global.Promise;

export const db = {
    Clients: Models.clientsModel(),
    AdditionalClientData: Models.additionalClientsDataModel(), 
    Payments: Models.paymentsModel(),
    Rutines: Models.rutinesModel(),
    MessagesAgenda: Models.messagesAgendaModel(),
};
