// backend/middleware/auth.middleware.js
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// Named export as 'protectRoute'
export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt; // Make sure cookie-parser is used in server.js
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId);
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    next();
  } catch (err) {
    console.log("Auth middleware error:", err.message);
    res.status(401).json({ message: "Unauthorized" });
  }
};
