export default async function sendEmail(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Método no permitido" });
    }
  
    const { subject, clientEmail, clientName, content, typeOfEmail } = req.body;
  
    const emailContent = generateEmailContent(typeOfEmail, content);
  
    const payload = {
      sender: {
        name: process.env.COMPANY_NAME,
        email: process.env.COMPANY_EMAIL,
      },
      to: [{ email: clientEmail, name: clientName }],
      subject: subject,
      htmlContent: emailContent,
    };
  
    try {
      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.BREVO_API_KEY,
        },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Error al enviar el correo");
      }
  
      res.status(200).json({ message: "Correo enviado con éxito", data });
    } catch (error) {
      console.error("Error al enviar el correo:", error.message);
      res.status(500).json({ message: "Error al enviar el correo", error: error.message });
    }
  }
  
  function generateEmailContent(typeOfEmail, content) {
    switch (typeOfEmail) {
      case "routine":
      case "reminder":
        return `<html><body><h1>${content}</h1></body></html>`;
      default:
        throw new Error("Tipo de correo no válido");
    }
  }
  