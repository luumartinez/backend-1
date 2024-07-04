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

const ProductModel = require('../models/producto.schema')
const obtenerTodosLosProductos = async() => {
  const productos = await ProductModel.find()
  return productos;
};

const obtenerUnProducto = (id) => {
  const producto = ProductModel.findOne({_id: id});
  return producto;
};

const nuevoProducto = (body) => {
  try {
    const newProduct = new ProductModel(body)
    return newProduct
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

const editarProducto = (idProducto) => {
  try {
    const posicionProdEnElArray = productos.findIndex((prod) => prod.id === idProducto);
    const productoEditado = {
      id,
      ...req.body,
    };
    productos[posicionProdEnElArray] = productoEditado;
    return productoEditado;
  } catch (error) {
    console.log(error);
  }
};

const eliminarProducto = (idProducto) => {
  try {
    const posicionProdEnElArray = productos.findIndex((prod) => prod.id !== idProducto);
    productos.splice(posicionProdEnElArray, 1);
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
