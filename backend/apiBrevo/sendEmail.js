import brevo from "@getbrevo/brevo";

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

const smtpEmail = new brevo.SendSmtpEmail();

export async function sendRutineByEmail() {
  try {

    smtpEmail.subject = "Hola cualio";
    smtpEmail.to = [{ email: "jorgerojas765lt@gmail.com", name: "Rigoberto" }];
    smtpEmail.htmlContent = `<html><body><h1> Hola pepepepep </h1></body></html>`;
    smtpEmail.sender = {
      name: "Niger Gym",
      email: "marchena.isma@gmail.com", 
    };

    const response = await apiInstance.sendTransacEmail(smtpEmail);

  } catch (error) {
    console.error("Error al enviar el correo:", error.message);
    if (error.response) {
      console.error("Detalles del error:", error.response.body);
    }
  }
}
