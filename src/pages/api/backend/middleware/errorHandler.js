export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong! Contact the developers" });
  };
  
  // Manejo de promesas no capturadas
  export const handleUnhandledRejection = (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
    process.exit(1);
  };