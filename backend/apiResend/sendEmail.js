import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendRutineByEmail(body, rutine) {
  const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>', 
    to: ['jorge.rojas.mena@est.una.ac.cr'], // En desarrollo, solo puedes enviar a tu propio correo //! Del body sacar el gmail
    subject: 'Hello World',
    html: `<strong> ${rutine} </strong>`,
  });

  if (error) {
    return console.error({ error });
  }

  console.log({ data });
}
