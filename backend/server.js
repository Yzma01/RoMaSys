import express from "express";
import clientsRoutes from "./api/routes/clients-routes.js";
import paymentsRoutes from "./api/routes/payments-routes.js";
import filterRoutes from "./api/routes/filter-routes.js";
import { whatsapp } from "./apiWhatsApp/lib/whatsapp.js";
import sendRoutine from "./apiWhatsApp/routes/links.js";
import notifyExpiration from "./apiWhatsApp/routes/notify-expiration.js";
import { startMessageSending } from "./api/schedule-messages/membership-to-expire.js";
import { validateHttpMethod } from "./api/middleware/validation.js";
import {
  errorHandler,
  handleUnhandledRejection,
} from "./api/middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//? Middleware para validar métodos HTTP
app.use(validateHttpMethod);

//? Rutas de API
app.use("/api/clients", clientsRoutes);
app.use("/api/payments", paymentsRoutes);
app.use("/api/filter/clients", filterRoutes);

//? Rutas para enviar rutinas a WhatsApp
app.use("/apiWhatsApp/routes", sendRoutine);

// Rutas para avisar caducidad de membresías
app.use("/apiMembership", notifyExpiration);

//? Inicializa el cliente de WhatsApp
whatsapp.initialize();

startMessageSending();

//? Manejo de promesas no capturadas
process.on("unhandledRejection", handleUnhandledRejection);

//? Middleware para manejar errores globales
app.use(errorHandler);

//? Inicializa el servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
