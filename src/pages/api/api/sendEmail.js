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
    content = `<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; margin: 20px; }
        .container { max-width: 800px; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
        h1, h2 { color: #007BFF; }
        h3 { color: #0056b3; }
        ul { list-style: none; padding: 0; }
        li { margin-bottom: 5px; }
        .section { margin-bottom: 20px; padding-bottom: 10px; border-bottom: 2px solid #ddd; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Plan de Ejercicios</h1>
        <h2>Edad: 0-20 años</h2>
        
        <div class="section">
            <h2>Hombres</h2>
            <p><strong>Días por semana:</strong> 5 días</p>
            
            <h3>Lunes: Fuerza + Cardio</h3>
            <p><strong>Calentamiento:</strong> 5-10 min de saltos o carrera suave</p>
            <p><strong>Circuito (3 rondas):</strong></p>
            <ul>
                <li>Flexiones (3x10)</li>
                <li>Sentadillas (3x15)</li>
                <li>Plancha (3x30 seg)</li>
                <li>Burpees (3x8)</li>
            </ul>
            <p><strong>Cardio:</strong> 15-20 min de carrera o bicicleta</p>
            
            <h3>Martes: Cardio</h3>
            <p>30-45 min de natación o ciclismo</p>
            
            <h3>Miércoles: Fuerza + Cardio</h3>
            <p>Repite el lunes</p>
            
            <h3>Jueves: Cardio</h3>
            <p>30-45 min de caminar rápido</p>
            
            <h3>Viernes: Fuerza + Cardio</h3>
            <p>Repite el lunes</p>
        </div>
        
        <div class="section">
            <h2>Mujeres</h2>
            <p><strong>Días por semana:</strong> 5 días</p>
            
            <h3>Lunes: Fuerza + Cardio</h3>
            <p><strong>Calentamiento:</strong> 5-10 min de saltos o carrera suave</p>
            <p><strong>Circuito (3 rondas):</strong></p>
            <ul>
                <li>Flexiones (3x8-10)</li>
                <li>Sentadillas (3x15)</li>
                <li>Plancha (3x30 seg)</li>
                <li>Zancadas (3x10 por pierna)</li>
            </ul>
            <p><strong>Cardio:</strong> 15-20 min de carrera o bicicleta</p>
            
            <h3>Martes: Cardio</h3>
            <p>30-45 min de danza o aerobic</p>
            
            <h3>Miércoles: Fuerza + Cardio</h3>
            <p>Repite el lunes</p>
            
            <h3>Jueves: Cardio</h3>
            <p>30-45 min de caminar rápido</p>
            
            <h3>Viernes: Fuerza + Cardio</h3>
            <p>Repite el lunes</p>
        </div>
    </div>
</body>
</html>
`
    switch (typeOfEmail) {
      case "routine":
      case "reminder":
        return `${content}`;
      default:
        throw new Error("Tipo de correo no válido");
    }
  }
  