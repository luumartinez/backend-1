//Por mongoose creo la estructura de los datos que tengo que recibir.
// Si falta o si sobra un dato -> manda error

const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  precio: { type: String, required: true },
  imagen: {
    type: String,
    default:''
  },
});

const ProductModel = mongoose.model("product", ProductSchema);
module.exports = ProductModel;
