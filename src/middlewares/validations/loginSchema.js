const yup = require("yup");

const loginValidation = yup.object().shape({
  email: yup.string().email().required("O campo email é obrigatório!"),
  senha: yup
    .string()
    .min(8, "A senha deve ter pelo menos 8 caracteres!")
    .required(),
});

module.exports = { loginValidation };
