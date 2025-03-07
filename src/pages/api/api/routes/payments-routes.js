// pages/api/payments.js
import { addPayment, getPayment } from "../controllers/payments-controller.js";

export default async function handler(req, res) {

  try {
    switch (req.method) {
      case "GET":
        await getPayment(req, res);
        break;

      case "POST":
        console.log("🐢🐢🐢🐢🐢🐢🐢🐢🐢🐢🐢🐢");
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