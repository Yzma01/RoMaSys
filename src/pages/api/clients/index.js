import clientsRoutes from "../api/routes/clients-routes.js"

console.log("Enter a clientes");

export default async function handler(req, res) {

    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  
    // Manejar solicitudes OPTIONS (preflight)
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }
  
    try {
      console.log("Tamos en el try");
      await clientsRoutes(req, res);
    } catch (error) {
      console.error("Error in /api/clients:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }