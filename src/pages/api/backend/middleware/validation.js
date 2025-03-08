export const validateHttpMethod = (req, res, next) => {
    const allowedMethods = ["GET", "POST", "PUT", "DELETE"];
    if (!allowedMethods.includes(req.method)) {
      return res
        .status(405)
        .json({ message: `Method ${req.method} not allowed` });
    }
    next();
  };