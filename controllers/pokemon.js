const Pokemon = require("../models/Pokemon");

exports.list = async (req, res) => {
  try {
    const pokemons = await Pokemon.find({});
    res.render("Pokemon_List", { pokemons: pokemons });
  } catch (e) {
    res.status(404).send({ message: "could not list pokemon" });
  }
};

exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    await Pokemon.findByIdAndRemove(id);
    res.redirect("/Pokemon_List");
  } catch (e) {
    res.status(404).send({
      message: `could not delete pokemon ${id}.`,
    });
  }
};

exports.create = async (req, res) => {

  try {
    const pokemon = new Pokemon({ Name: req.body.name, Type1: req.body.type1, Type2: req.body.type2 });
    await pokemon.save();
    res.redirect('/Pokemon_List/?message=New pokemon was added!')
  } catch (e) {
    if (e.errors) {
      console.log(e.errors);
      res.render('Pokemon_New', { errors: e.errors })
      return;
    }
    return res.status(400).send({
      message: JSON.parse(e),
    });
  }
}

exports.edit = async (req, res) => {
  const id = req.params.id;
  try {
    const pokemon = await Pokemon.findById(id);
    res.render('Pokemon_Update', { pokemons: pokemons, id: id });
  } catch (e) {
    res.status(404).send({
      message: `could not find Pokemon ${id}.`,
    });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const pokemon = await Pokemon.updateOne({ _id: id }, req.body);
    res.redirect('/Pokemon_List/?message=pokemon has been updated');
  } catch (e) {
    res.status(404).send({
      message: `couldn't find Pokemon ${id}.`,
    });
  }
};