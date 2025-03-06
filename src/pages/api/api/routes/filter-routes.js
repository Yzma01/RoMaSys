// pages/api/filter/clients.js
import { getClientsByMonthlyType } from "../controllers/filter-controller.js";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      // Llama a la función del controlador
      await getClientsByMonthlyType(req, res);
    } else {
      // Método no permitido
      res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Error in /api/filter/clients:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}