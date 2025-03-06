// pages/api/payments.js
import { addPayment, getPayment } from "../controllers/payments-controller.js";

export default async function handler(req, res) {
  const { pay_client_id } = req.query; // Obtén el parámetro de la URL (si existe)

  try {
    switch (req.method) {
      case "GET":
        // Si hay un pay_client_id, obtén un pago específico
        await getPayment(req, res);
        break;

      case "POST":
        // Agrega un nuevo pago
        await addPayment(req, res);
        break;

      default:
        // Método no permitido
        res.status(405).json({ message: "Method Not Allowed" });
        break;
    }
  } catch (error) {
    console.error("Error in /api/payments:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}