const yup = require("yup");

const pokemonRegisterValidation = yup.object().shape({
  nome: yup
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres!")
    .required(),

  habilidades: yup.string().required(),

  imagem: yup.string(),

  apelido: yup.string(),
});

module.exports = { pokemonRegisterValidation };
