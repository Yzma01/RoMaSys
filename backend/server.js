import express from "express";
import { db } from "./api/db.js";
import { clientsRepo } from "./api/CRUD/clients-repo.js";
import { clientsFilter } from "./api/Filter/clients.js";
import { paymentsRepo } from "./api/CRUD/payments-repo.js";
import { whatsapp } from "./apiWhatsApp/lib/whatsapp.js";
import router from "./apiWhatsApp/routes/links.js";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//! Middleware para validar métodos HTTP
app.use((req, res, next) => {
  const allowedMethods = ["GET", "POST", "PUT", "DELETE"];
  if (!allowedMethods.includes(req.method)) {
    return res
      .status(405)
      .json({ message: `Method ${req.method} not allowed` });
  }
  next();
});

clientsFunctions();
clientsPyments();
clientFilters();

//* Rutas de envío que usemos
app.use("/apiWhatsApp/routes", router);

//* Inicializa el cliente de WhatsApp
//whatsapp.initialize();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//*Funciones con métodos HTTP
function clientFilters() {
  app.get("/api/Filter/clients", clientsFilter.getClientsByMonthlyType);
}

function clientsPyments() {
  app.post("api/CRUD/payments-repo.js", paymentsRepo.addPayment);
}

function clientsFunctions() {
  app.get("/api/CRUD/clients-repo", clientsRepo.getClients);
  app.post("/api/CRUD/clients-repo", clientsRepo.addClient);
  app.put("/api/CRUD/clients-repo/:cli_id", clientsRepo.updateClient);
  app.delete("/api/CRUD/clients-repo/:cli_id", clientsRepo._deleteClient);
}
