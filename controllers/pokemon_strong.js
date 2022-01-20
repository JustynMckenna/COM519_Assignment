const Pokemon = require("../models/Pokemon");

exports.list = async (req, res) => {
  try {
    const pokemons = await Pokemon.find({});
    res.render("Pokemon_Strong", { pokemons: pokemons });
  } catch (e) {
    res.status(404).send({ message: "could not list pokemon" });
  }
};

exports.strong = async (req, res) => {
  try {
    const pokemon_strong = Pokemon({ value: req.body.name });
    res.render('Pokemon_Strong',  { pokemon_strong : value })
  } catch (e) {
    res.status(404).send({ message: "could not list type"})
  }
};
