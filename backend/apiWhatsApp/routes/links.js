import { Router } from 'express';  
import whatsapp from '../lib/whatsapp.js'

const router = Router();

router.post('/enviarMensaje', async (req, res) => {
    console.log("Si entre aqui? 😇", req.body);
  const { postalCode, phones, mensaje } = req.body; 
  
  const results = [];

  for (let i = 0; i < phones.length; i++) {
    let completePhone = postalCode + phones[i];
    const chatId = completePhone.substring(1) + "@c.us"; 
    const number_details = await whatsapp.getNumberId(chatId);
    
    if (number_details) {
      await whatsapp.sendMessage(chatId, mensaje);
      results.push({ phone: phones[i], sent: true });
    } else {
      results.push({ phone: phones[i], sent: false });
    }
  }

  res.json({ results });
});

export default router;
