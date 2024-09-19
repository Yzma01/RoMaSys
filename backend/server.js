import express from "express";
// import cors from 'cors'
import { db } from "./api/db.js";
import { clientsRepo } from "./api/CRUD/clients-repo.js";

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//!Functions with methods HTTP

function clientsFunctions() {
  app.get("/api/CRUD/clients-repo", clientsRepo.getClients);
}