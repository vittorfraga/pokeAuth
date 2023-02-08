const db = require("../config/dbConnection");
const bcrypt = require("bcryptjs");

const login = async (email, senha) => {
  try {
    const { rows } = await db.query("SELECT * FROM usuarios WHERE email = $1", [
      email,
    ]);
    const [user] = rows;

    if (!user) {
      return { error: "Usuário não encontrado!" };
    }

    const passwordMatch = await bcrypt.compare(senha, user.senha);

    if (!passwordMatch) {
      return { error: "Senha incorreta!" };
    }

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { login };
