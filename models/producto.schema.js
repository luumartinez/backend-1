//Por mongoose creo la estructura de los datos que tengo que recibir.
// Si falta o si sobra un dato -> manda error

const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  nombre: String,
  descripcion: { type: String, required: true },
  precio: Number,
});

const ProductModel = mongoose.model("product", ProductSchema);
module.exports = ProductModel;
