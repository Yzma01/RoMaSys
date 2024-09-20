import express from "express";
import { db } from "./api/db.js";
import { clientsRepo } from "./api/CRUD/clients-repo.js";
import { clientsFilter } from "./api/Filter/clients.js";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());


//! Middleware to validate methods HTTP
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
clientFilters();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



//!Functions with methods HTTP

function clientFilters(){

  app.get("/api/Filter/clients", clientsFilter.getClientsByMonthlyType);

}

function clientsFunctions() {
  app.get("/api/CRUD/clients-repo", clientsRepo.getClients);

  app.post("/api/CRUD/clients-repo", clientsRepo.addClient);

  app.put("/api/CRUD/clients-repo/:cli_id", clientsRepo.updateClient);

  app.delete("/api/CRUD/clients-repo/:cli_id", clientsRepo._deleteClient);

}
