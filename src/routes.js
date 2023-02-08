const express = require("express");
const { userLogin } = require("./controllers/authController");
const {
  createPokemon,
  updatePokemon,
  getAllPokemons,
} = require("./controllers/pokemonController");
const { createUser } = require("./controllers/userController");
const { tokenVerify } = require("./middlewares/tokenVerify");

const router = express.Router();

router.post("/register", createUser);
router.post("/login", userLogin);

router.post("/pokemons/", tokenVerify, createPokemon);
router.patch("/pokemons/:id", tokenVerify, updatePokemon);
router.get("/pokemons", tokenVerify, getAllPokemons);
router.get("/pokemons/:id", tokenVerify);
router.delete("/pokemons/:id", tokenVerify);

module.exports = router;
