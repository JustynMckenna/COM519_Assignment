const Pokemon = require("../models/Pokemon");

exports.list = async (req, res) => {
  try {
    const pokemons = await Pokemon.find({});
    res.render("Pokemon_Weak", { pokemons: pokemons });
  } catch (e) {
    res.status(404).send({ message: "could not list pokemon" });
  }
};

exports.weak = async (req, res) => {
  try {
    const pokemon_weak = Pokemon({ value: req.body.name });
    res.render('Pokemon_Weak',  { pokemon_weak : value })
  } catch (e) {
    res.status(404).send({ message: "could not list type"})
  }
};