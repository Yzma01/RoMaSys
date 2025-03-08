import brevo from "@getbrevo/brevo";

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

const smtpEmail = new brevo.SendSmtpEmail();

//?Podria usar esta para todo los contatactos con el ciente, pero quiza mejor separarlas, aunque podria hacer solo una verficacion dobre para que es y segun esto se cambie el html
export async function sendEmail(
  subject,
  clientEmail,
  clientName,
  content,
  typeOfEmail
) {

  try {
    smtpEmail.subject = subject;
    smtpEmail.to = [{ email: clientEmail, name: clientName }];

    typeOfEmailToSend(typeOfEmail, content);

    smtpEmail.sender = {
      name: process.env.COMPANY_NAME,
      email: process.env.COMPANY_EMAIL,
    };

    await apiInstance.sendTransacEmail(smtpEmail);
  } catch (error) {
    console.error("Error al enviar el correo:", error.message);
    if (error.response) {
      console.error("Detalles del error:", error.response.body);
    }
  }
}

function typeOfEmailToSend(typeOfEmail, content) {
  switch (typeOfEmail) {
    case "routine":
      sendRutine(content);
      break;
    case "reminder":
      sendReminder(content);
      break;
  }
}

//!hacer Diseno para email de rutina
function sendRutine(content) {
  smtpEmail.htmlContent = <html><body><h1> ${content} </h1></body></html>;
}

//! hacer Diseno para email de recordatorio
function sendReminder(content) {
  smtpEmail.htmlContent = <html><body><h1> ${content} </h1></body></html>;
}