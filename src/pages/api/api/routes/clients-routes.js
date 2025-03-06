// pages/api/clients.js
import { getClients, addClient, updateClient, deleteClient, getClientById } from "../controllers/clients-controller.js";

export default async function handler(req, res) {

  console.log("holait");
  const { cli_id } = req.query; // Obtén el parámetro de la URL (si existe)

  try {
    switch (req.method) {
      case "GET":
        if (cli_id) {
          // Si hay un cli_id, obtén un cliente específico
          await getClientById(req, res);
        } else {
          // Si no hay cli_id, obtén todos los clientes
          await getClients(req, res);
        }
        break;

      case "POST":
        // Agrega un nuevo cliente
        await addClient(req, res);
        break;

      case "PUT":
        // Actualiza un cliente existente
        await updateClient(req, res);
        break;

      case "DELETE":
        // Elimina un cliente
        await deleteClient(req, res);
        break;

      default:
        // Método no permitido
        res.status(405).json({ message: "Method Not Allowed" });
        break;
    }
  } catch (error) {
    console.error("Error in /api/clients:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}