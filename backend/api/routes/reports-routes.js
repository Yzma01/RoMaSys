import express from "express";
import { getReport } from "../controllers/reports-controller";

const router = express.Router();

//* Rutas para las solicitues de reportes
router.get("/", getReport); 

export default router;
