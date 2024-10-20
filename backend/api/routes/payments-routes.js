import express from "express";
import { addPayment, getPayment } from "../controllers/payments-controller.js";

const router = express.Router();

router.post("/", addPayment);
router.get("/:pay_client_id", getPayment);

export default router;
