import express from "express";
import { isAuthenticated } from "../../apiWhatsApp/lib/whatsapp.js";

const router = express.Router();

router.get("/", isAuthenticated);

export default router;
