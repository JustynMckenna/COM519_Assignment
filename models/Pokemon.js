const mongoose = require("mongoose");
const { Schema } = mongoose;

const pokemonSchema = new Schema(
  {
    Name: String,
    Type1: String,
    Type2: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pokemon", pokemonSchema);