// pages/api/reports.js
import {
  getReport,
  getIncomingByRange,
} from "../controllers/reports-controller.js";

export default async function handler(req, res) {
  const { incomingByRange } = req.query;
  console.log("🚀 ~ handler ~ incomingByRange:", incomingByRange);
  const { startDate, endDate, monthlyPaymentType } = req.query;


  try {
    switch (req.method) {
      case "GET":
          await getIncomingByRange(req, res);
          break;
      default:
        res.status(405).json({ message: "Method Not Allowed" });
        break;
    }
  } catch (error) {
    console.error("Error in /api/reports:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
