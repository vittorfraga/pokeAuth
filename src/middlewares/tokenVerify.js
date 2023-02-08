const jwt = require("jsonwebtoken");

const tokenVerify = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ error: "Token não fornecido" });

  if (!process.env.JWT_SECRET)
    return res.status(500).json({ error: "JWT_SECRET not found" });

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido" });
  }
};

module.exports = { tokenVerify };
