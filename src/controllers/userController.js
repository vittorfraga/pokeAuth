const yup = require("yup");

const { insertUser } = require("../models/users");
const userRegisterValidation = require("../middlewares/validations/userRegister");

const createUser = async (req, res) => {
  try {
    await userRegisterValidation.validate(req.body, { abortEarly: false });

    const { nome, email, senha } = req.body;

    const result = await insertUser(nome, email, senha);

    if (result.error) {
      return res.status(400).json({
        error: result.error,
      });
    }

    return res.status(201).json({
      message: "Usuário criado com sucesso!",
    });
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      return res.status(400).json({
        errors: err.errors,
      });
    } else {
      return res.status(500).json({ message: err.message });
    }
  }
};

module.exports = {
  createUser,
};
