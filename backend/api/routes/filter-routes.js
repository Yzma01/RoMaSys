import express from "express";
import { getClientsByMonthlyType } from "../controllers/filter-controller.js";

const router = express.Router();

router.get("/", getClientsByMonthlyType); //!Change name of this function, because not is "escalable"

export default router;
