import express from "express";
import { isAuthenticated } from "../../apiWhatsApp/lib/whatsapp.js";

const router = express.Router();

router.get("/", isAuthenticated); //!Delete or comment this shit 

export default router;
