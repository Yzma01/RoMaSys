import { getReport } from "../backend/controllers/reports-controller.js";
import reportsRoutes from "../backend/routes/reports-routes.js"


export default async function handler(req, res) {

    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }
  
    try {
      await getReport(req, res);
    } catch (error) {
      console.error("Error in /api/reportsRoutes:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }