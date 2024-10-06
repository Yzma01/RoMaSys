import express from "express";
import { getClientsByMonthlyType } from "../controllers/filter-controller.js";

const router = express.Router();

router.get("/", getClientsByMonthlyType);

export default router;
