import { Router } from 'express';  
import {whatsapp, isAuthenticated} from '../lib/whatsapp.js';

const router = Router();

router.post('/enviarMensaje', async (req, res) => {
  try {
    console.log("Se recibio en api wasa:", req.body);
    
    const { postalCode, phones, mensaje } = req.body;

    if (!isAuthenticated()) {
      return res.status(403).json({ error: 'No autenticado. Por favor, verifica tu sesión de WhatsApp.' });
    }

    if (!postalCode || !phones || !mensaje) {
      console.error('Faltan datos: postalCode, phones o mensaje');
      return res.status(400).json({ error: 'Faltan datos: postalCode, phones o mensaje' });
    }

    if (!Array.isArray(phones) || phones.length === 0) {
      console.error('El campo phones debe ser un array no vacío');
      return res.status(400).json({ error: 'El campo phones debe ser un array no vacío' });
    }


    const results = [];

    for (let i = 0; i < phones.length; i++) {
      try {
        let completePhone = postalCode + phones[i];
        const chatId = completePhone.substring(1) + "@c.us";
        
        const number_details = await whatsapp.getNumberId(chatId);
        
        if (number_details) {
          await whatsapp.sendMessage(chatId, mensaje);
          results.push({ phone: phones[i], sent: true });
        } else {
          results.push({ phone: phones[i], sent: false, error: 'Número no válido' });
        }
      } catch (err) {
        //! Manejar error por cada teléfono
        console.error(`Error enviando mensaje a ${phones[i]}:`, err);
        results.push({ phone: phones[i], sent: false, error: 'Error al enviar el mensaje' });
      }
    }

    return res.status(200).json({ results });

  } catch (error) {
    console.error('Error en el envío de mensajes:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});




export default router;
