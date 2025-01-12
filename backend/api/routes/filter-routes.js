import express from "express";
import { getClientsByMonthlyType } from "../controllers/filter-controller.js";

const router = express.Router();

router.get("/", getClientsByMonthlyType); //!Change name of this function, because not are "escalable"

export default router;
