import express from "express";
import { getReport, getIncomingByRange } from "../controllers/reports-controller.js";

const router = express.Router();

//* Rutas para las solicitues de reportes
router.get("/", getReport); 
router.get("/incomingByRange/", getIncomingByRange);

export default router;
