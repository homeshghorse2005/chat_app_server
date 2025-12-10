import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,               // FORCE TRUE ON VERCEL
    sameSite: "none",           // required for cross-domain
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};
