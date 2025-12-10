export const generateToken = (userId, res) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,       // required on HTTPS
    sameSite: "none",   // cross-site
    path: "/",
    maxAge: 7*24*60*60*1000,
  });

  return token;
};
