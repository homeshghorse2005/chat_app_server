import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  // Set cookie for browser
  res.cookie("jwt", token, {
    httpOnly: true, // cannot access in JS
    secure: process.env.NODE_ENV === "production", // HTTPS only
    sameSite: "none", // cross-site cookie
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return token;
};
