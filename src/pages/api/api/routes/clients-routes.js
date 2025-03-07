// pages/api/clients.js
import { getClients, addClient, updateClient, deleteClient, getClientById } from "../controllers/clients-controller.js";

export default async function handler(req, res) {

  try {
    switch (req.method) {
      case "GET":
        if (cli_id) {
          await getClientById(req, res);
        } else {
          await getClients(req, res);
        }
        break;

      case "POST":
        await addClient(req, res);
        break;

      case "PUT":
        await updateClient(req, res);
        break;

      case "DELETE":
        await deleteClient(req, res);
        break;

      default:
        res.status(405).json({ message: "Method Not Allowed" });
        break;
    }
  } catch (error) {
    console.error("Error in /api/clients:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}