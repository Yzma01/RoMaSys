import reportsRoutes from "../api/routes/reports-routes.js"

console.log("Enter a clientes");

export default async function handler(req, res) {
    // Configura CORS
    res.setHeader("Access-Control-Allow-Origin", "https://ro-ma-sys.vercel.app");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
    // Manejar solicitudes OPTIONS (preflight)
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }
  
    try {
      await reportsRoutes(req, res);
    } catch (error) {
      console.error("Error in /api/reportsRoutes:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }