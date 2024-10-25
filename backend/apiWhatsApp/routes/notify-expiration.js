import { Router } from "express";
import { whatsapp } from "../lib/whatsapp.js";

const router = Router();

router.post("/notifyExpiration", async (req, res) => {
  const body = req.body;
  const phone = body.cli_phone;
  const postalCode = "506";
  const mensaje = "Su mesualidad se encuentra vencida";

  if (!phone) {
    return res.status(400).json({ error: "Faltan el phone" });
  }

  try {
    const results = [];

    const chatId = `${postalCode}${phone}@c.us`;
    const numberDetails = await whatsapp.getNumberId(chatId);
    if (numberDetails) {
      await whatsapp.sendMessage(chatId, mensaje);
      results.push({ phone, sent: true });
    } else {
      results.push({ phone, sent: false, error: "Número no válido" });
    }

    return res.status(200).json({ results });
  } catch (err) {
    return res.status(500).json({ error: "Error al enviar mensajes" });
  }
});

export default router;
                                                                                   