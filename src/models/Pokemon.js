const db = require("../config/dbConnection");

const insertPokemon = async (
  usuario_id,
  nome,
  apelido,
  habilidades,
  imagem
) => {
  try {
    const { rows } = await db.query(
      "INSERT INTO pokemons (usuario_id, nome, apelido, habilidades, imagem) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [usuario_id, nome, apelido, habilidades, imagem]
    );

    const abilitiesArray = habilidades
      .split(",")
      .map((habilidade) => habilidade.trim());

    const { rows: loggedUser } = await db.query(
      "SELECT nome FROM usuarios WHERE id = $1",
      [usuario_id]
    );

    usuario_id = loggedUser;

    return {
      id: rows[0].id,
      usuário: usuario_id[0].nome,
      nome,
      apelido,
      habilidades: abilitiesArray,
      imagem,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateNickname = async (newNickName, pokemonId) => {
  try {
    const query = `UPDATE pokemons SET apelido = $1 WHERE id = $2`;
    const values = [newNickName, pokemonId];

    const respost = await db.query(query, values);

    return respost.rows[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getAll = async () => {
  try {
    const { rows } = await db.query("SELECT * FROM pokemons ORDER BY id");

    const pokemons = rows.map(async (pokemon) => {
      const abilitiesArray = pokemon.habilidades
        .split(",")
        .map((habilidade) => habilidade.trim());

      const { rows: loggedUser } = await db.query(
        "SELECT nome FROM usuarios WHERE id = $1",
        [pokemon.usuario_id]
      );

      return {
        id: pokemon.id,
        usuário: loggedUser[0].nome,
        nome: pokemon.nome,
        apelido: pokemon.apelido,
        habilidades: abilitiesArray,
        imagem: pokemon.imagem,
      };
    });

    return Promise.all(pokemons);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { insertPokemon, updateNickname, getAll };
