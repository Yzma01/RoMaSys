import pkg from "whatsapp-web.js";
const { Client, LocalAuth, NoAuth } = pkg;
import { startMessageSending } from "../../api/schedule-messages/membership-to-expire.js";
import qrcodeTerminal from "qrcode-terminal";
import qrcode from "qrcode";
import fs from "fs";
import path from "path";

let authenticated = false;
let messageInterval;
let qrReceived = null;
let qrInterval = null;
const GENERATE_QR_INTERVAL = 10000;

function setMessageInterval(interval) {
  messageInterval = interval;
}

function clearMessageInterval() {
  clearTimeout(messageInterval);
  messageInterval = null;
}
const whatsapp = new Client({
  webVersionCache: {
    type: "remote",
    remotePath:
      "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
  },
  authStrategy: new LocalAuth({ clientId: "my-session", dataPath: "./auth-data" }),
  puppeteer: {
    args: ["--disable-logging"],
  },
});

function generarQR(qr) {
  const qrDir = path.join(path.resolve(process.cwd(), "public"), "qrIMG");
  if (!fs.existsSync(qrDir)) {
    fs.mkdirSync(qrDir);
  }

  const qrImagePath = path.join(qrDir, "qr.png");

  //!Esto solo es pa ver si eesta bien
  qrcode.toFile(qrImagePath, qr, (err) => {
    if (err) {
      console.error("Error al generar la imagen del QR:", err);
    } else {
      console.log(`QR guardado como imagen en ${qrImagePath}`);
    }
  });
}

// Evento 'qr' para cuando se reciba un código QR
whatsapp.on("qr", (qr) => {
  // Guardar el QR recibido en una variable
  console.log("QR recibido, generando imagen...");
  qrReceived = qr;
  generarQR(qr);

  if (!qrInterval) {
    qrInterval = setInterval(() => {
      if (qrReceived) {
        console.log("Emitiendo QR primera vez");
        whatsapp.emit("qr", qrReceived);
      }
    }, GENERATE_QR_INTERVAL);
  }
});

// Evento 'ready' para cuando el cliente esté listo
whatsapp.on("ready", () => {
  console.log("Cliente listo ✅");
  authenticated = true;
  startMessageSending(authenticated);

  if (qrReceived) {
    console.log("Reemitiendo QR estando list");
    whatsapp.emit("qr", qrReceived);
  }

  if (!qrInterval) {
    qrInterval = setInterval(() => {
      if (qrReceived) {
        console.log("Emitiendo QR de nuevo esta listo");
        whatsapp.emit("qr", qrReceived);
      }
    }, GENERATE_QR_INTERVAL);
  }
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

  clearMessageInterval(messageInterval);

  if (qrInterval) {
    clearInterval(qrInterval);
    qrInterval = null;
  }

  // Ruta al archivo bloqueado
  const debugLogPath = path.join(
    path.resolve(process.cwd(), "auth-data"),
    "session-my-session",
    "Default",
    "chrome_debug.log"
  );

  const pathCookies = path.join(
    path.resolve(process.cwd(), "auth-data"),
    "session-my-session",
    "Default",
    "Cookies"
  );


  try {
    // Cerrar el cliente de forma segura
    await whatsapp.destroy();
    console.log("Cliente destruido correctamente.");

    try {
      // Eliminar el archivo si existe
      if (fs.existsSync(pathCookies)) {
        fs.unlinkSync(pathCookies);
        console.log("Archivo pathCookies.log eliminado con éxito.");
      }else{
        console.log("no sdfdgdfddfvffffffffffff")
      }
    } catch (err) {
      console.error("Error al eliminar pathCookies", err);
    }

    try {
      // Eliminar el archivo si existe
      if (fs.existsSync(debugLogPath)) {
        fs.unlinkSync(debugLogPath);
        console.log("Archivo chrome_debug.log eliminado con éxito.");
      }else{
        console.log("no estaaaaaaaaaaaaa")
      }
    } catch (err) {
      console.error("Error al eliminar chrome_debug.log:", err);
    }
  } catch (err) {
    console.error("Error al destruir el cliente:", err);
  }
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});


const isAuthenticated = (req, res) => {
  return res.json(authenticated);
};

//!Quitar la funcion is Autheticaed que se usa en otro lado
export {
  whatsapp,
  isAuthenticated,
  authenticated,
  setMessageInterval,
  clearMessageInterval,
};
