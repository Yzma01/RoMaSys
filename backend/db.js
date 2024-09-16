import getConfig from "next/config";
import mongoose from "mongoose";
import { Models } from "./models"

const { serverRuntineConfig } = getConfig();


mongoose.connect(
    serverRuntineConfig.MONGODB_URI
)

mongoose.Promise = global.Promise;

export const db = {
    Clients: Models.clientsModel(),

    AdditionalClientData: Models.additionalClientsDataModel(), 
    Payments: Models.paymentsModel(),
    Rutines: Models.rutinesModel(),
    MessagesAgenda: Models.messagesAgendaModel(),
}