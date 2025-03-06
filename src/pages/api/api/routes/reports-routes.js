// pages/api/reports.js
import { getReport, getIncomingByRange } from "../controllers/reports-controller.js";

export default async function handler(req, res) {
  const { query } = req; // Obtén los parámetros de la URL (si existen)

  try {
    switch (req.method) {
      case "GET":
        if (query.incomingByRange) {
          // Si se solicita incomingByRange, llama a la función correspondiente
          await getIncomingByRange(req, res);
        } else {
          // Si no, obtén el reporte general
          await getReport(req, res);
        }
        break;

      default:
        // Método no permitido
        res.status(405).json({ message: "Method Not Allowed" });
        break;
    }
  } catch (error) {
    console.error("Error in /api/reports:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}