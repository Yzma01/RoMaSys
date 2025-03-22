import paymentsRoutes from "../backend/routes/payments-routes.js"

export default async function handler(req, res) {

    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }
  
    try {
        console.log("popopopopoopopooppo")
      await paymentsRoutes(req, res);
    } catch (error) {
      console.error("Error in /api/paymentsRoutes:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }