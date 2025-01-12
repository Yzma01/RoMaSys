import express from "express";
import { getClients, addClient, updateClient, deleteClient, getClientById } from "../controllers/clients-controller.js";

const router = express.Router();


router.get("/", getClients);
router.get("/:cli_id", getClientById); //!Ruta que me pidio isma, hacer luego
router.post("/", addClient);
router.put("/:cli_id", updateClient);
router.delete("/:cli_id", deleteClient);

export default router;
