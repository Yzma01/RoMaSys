import express from "express";
import { addPayment } from "../controllers/payments-controller.js";

const router = express.Router();

router.post("/", addPayment);

export default router;
