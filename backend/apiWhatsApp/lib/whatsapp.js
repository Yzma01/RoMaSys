// whatsapp.js
import pkg from "whatsapp-web.js";
const { Client, LocalAuth, NoAuth } = pkg;
import { startMessageSending } from "../../api/schedule-messages/membership-to-expire.js";
import qrcodeTerminal from "qrcode-terminal";
import qrcode from "qrcode";
import fs from "fs";
import path from "path";

let authenticated = false;
let messageInterval;

const whatsapp = new Client({
  webVersionCache: {
    type: "remote",
    remotePath:
      "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
  },
  authStrategy: new NoAuth(),
});

//* create QR
whatsapp.on("qr", (qr) => {
  // console.log("QR: ");
  // qrcodeTerminal.generate(qr, { small: true }); //!Luego quitar esto pa que no salga en consola

  const qrDir = path.join(path.resolve(process.cwd(), "public"), "qrIMG");
  if (!fs.existsSync(qrDir)) {
    fs.mkdirSync(qrDir);
  }

  const qrImagePath = path.join(qrDir, "qr.png");

  //! Esto era solo pa revisar, luego lo quito :)
  qrcode.toFile(qrImagePath, qr, (err) => {
    if (err) {
      console.error("Error al generar la imagen del QR:", err);
    } else {
      console.log(`QR guardado como imagen en ${qrImagePath}`);
    }
  });
});
whatsapp.on("ready", () => {
  console.log("Cliente listo ✅");
  authenticated = true;
  startMessageSending(authenticated); 
});

whatsapp.on("authenticated", (session) => {
  console.log("Cliente autenticado 👻");
  authenticated = true;
});

whatsapp.on("auth_failure", (msg) => {
  console.error("Autenticación falló:", msg);
  authenticated = false;
});

whatsapp.on("disconnected", async (reason) => {
  console.log("Cliente desconectado ☠️:", reason);
  authenticated = false;
  clearInterval(messageInterval); //!Creo que esto no se ocupa
});

const isAuthenticated = (req,res) => {
  return res.json(authenticated);
};


//!Quitar la funcion is Autheticaed que se usa en otro lado
export { whatsapp, isAuthenticated,  authenticated };