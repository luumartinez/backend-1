const { Schema, model } = require("mongoose");

const FavSchema = new Schema({
  idUsuario: { type: String },
  favoritos: [],
});

const FavModel = model('favs', FavSchema)
module.exports = FavModel
