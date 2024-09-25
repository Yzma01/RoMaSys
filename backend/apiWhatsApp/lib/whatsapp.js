// whatsapp.js
import pkg from "whatsapp-web.js";
const { Client, LocalAuth, NoAuth } = pkg;
import qrcodeTerminal from "qrcode-terminal";
import qrcode from "qrcode";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";



const whatsapp = new Client({
  webVersionCache: {
    type: "remote",
    remotePath:
      "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
  },
  authStrategy: new NoAuth(), // Cambia esto a LocalAuth si lo necesitas
});

let authenticated = false;

// Genera el QR en terminal
whatsapp.on("qr", (qr) => {
  console.log("QR: ");
  qrcodeTerminal.generate(qr, { small: true });

  const qrDir = path.join(path.resolve(process.cwd(), "public"), "qrIMG");
  if (!fs.existsSync(qrDir)) {
    fs.mkdirSync(qrDir);
  }

  const qrImagePath = path.join(qrDir, "qr.png");

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
  authenticated = true; // Marca como autenticado
});

whatsapp.on("authenticated", (session) => {
  console.log("Cliente autenticado 👻");
  authenticated = true; // Asegúrate de marcar como autenticado
});

whatsapp.on("auth_failure", (msg) => {
  console.error("Autenticación falló, contacte con los desarrolladores 📡:", msg);
  authenticated = false; // Marca como no autenticado en caso de fallo
});

whatsapp.on("disconnected", async (reason) => {
  console.log("Cliente desconectado ☠️:", reason);
  authenticated = false; // Marca como no autenticado al desconectarse
});

const isAuthenticated = () => {
  return authenticated; 
};

export { whatsapp, isAuthenticated }; 
