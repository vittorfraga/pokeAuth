const jwt = require("jsonwebtoken");
const { login } = require("../models/Auth");

const userLogin = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const user = await login(email, senha);

    if (!user) {
      return res.status(400).json({
        error: user.error,
      });
    }

    if (!process.env.JWT_SECRET) return "JWT_SECRET not found";
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    return res.status(200).json({
      message: "Usuário logado com sucesso!",
      token,
    });
  } catch (error) {
    console.log(`Erro: ${error}`);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { userLogin };
