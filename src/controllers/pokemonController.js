const yup = require("yup");
const {
  pokemonRegisterValidation,
} = require("../middlewares/validations/pokemonRegister");
const { insertPokemon, updateNickname, getAll } = require("../models/Pokemon");

const createPokemon = async (req, res) => {
  try {
    await pokemonRegisterValidation.validate(req.body, { abortEarly: false });

    const { nome, apelido, habilidades, imagem } = req.body;

    const usuario_id = req.userId;

    const data = await insertPokemon(
      usuario_id,
      nome,
      apelido,
      habilidades,
      imagem
    );

    if (!data) {
      return res.status(400).json({
        error: result.error,
      });
    }
    return res.status(201).json(data);
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      return res.status(400).json({
        errors: err.errors,
      });
    } else {
      console.log(`Error: ${err}`);
      return res.status(500).json({ message: err.message });
    }
  }
};

const updatePokemon = async (req, res) => {
  try {
    const { id } = req.params;
    const { apelido } = req.body;

    await updateNickname(apelido, id);

    return res.status(200).json({
      message: "Apelido atualizado com sucesso!",
    });
  } catch (err) {
    console.log(`Error: ${err}`);
    return res.status(500).json({
      error: err.message,
    });
  }
};

getAllPokemons = async (req, res) => {
  try {
    const pokemons = await getAll();
    res.status(200).json({ pokemons });
  } catch (error) {
    console.log(`Error: ${err}`);
    res.status(500).json({ message: "Erro ao obter todos os pokemons." });
  }
};

module.exports = { createPokemon, updatePokemon, getAllPokemons };
