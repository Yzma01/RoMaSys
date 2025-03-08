import filterRoutes from "../../backend/routes/filter-routes.js"

console.log("Enter a clientes");

export default async function handler(req, res) {

    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }
  
    try {
      console.log("holaaaaaaaaaaaaaaaaaaaaaaaaa");
      await filterRoutes(req, res);
    } catch (error) {
      console.error("Error in /api/filterRoutes:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }