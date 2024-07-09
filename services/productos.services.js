/* let productos = [
  {
    id: 1,
    nombre: "Celular",
    precio: 2000,
  },
  {
    id: 2,
    nombre: "Tablet",
    precio: 5000,
  },
];
 */

const ProductModel = require("../models/producto.schema");
const obtenerTodosLosProductos = async () => {
  const productos = await ProductModel.find();
  return productos;
};

const obtenerUnProducto = (id) => {
  const producto = ProductModel.findOne({ _id: id });
  return producto;
};

const nuevoProducto = (body) => {
  try {
    const newProduct = new ProductModel(body);
    return newProduct;
    /*     const nuevoProducto = {
      id: productos[productos.length - 1].id + 1,
      ...body,
    };
    productos.push(nuevoProducto);
    return nuevoProducto; */
  } catch (error) {
    console.log(error);
  }
};

const editarProducto = async (idProducto, body) => {
  try {
    const productoEditado = await ProductModel.findByIdAndUpdate(
      { _id: idProducto },
      body,
      { new: true }
    );
    //new: true -> devuelve la nueva actualizacion, si no devuelve la versión anterior
    return productoEditado;
  } catch (error) {
    console.log(error);
  }
};

const eliminarProducto = async (idProducto) => {
  try {
    await ProductModel.findByIdAndDelete({ _id: idProducto });
    return 200;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  obtenerTodosLosProductos,
  obtenerUnProducto,
  nuevoProducto,
  editarProducto,
  eliminarProducto,
};
