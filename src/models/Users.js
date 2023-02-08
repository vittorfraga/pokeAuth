const db = require("../config/dbConnection");
const bcrypt = require("bcryptjs");

const insertUser = async (nome, email, senha) => {
  try {
    const salt = await bcrypt.genSalt(10);

    const passwordToString = senha.toString();

    const passwordHash = await bcrypt.hash(passwordToString, salt);

    const { rows } = await db.query("SELECT * FROM usuarios WHERE email = $1", [
      email,
    ]);

    const [user] = rows;

    if (user) {
      return {
        error: "Email já cadastrado!",
      };
    } else {
      const { rowCount } = await db.query(
        "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *",
        [nome, email, passwordHash]
      );
      return rowCount;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  insertUser,
};
