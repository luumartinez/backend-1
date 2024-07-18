const ProductModel = require("../models/producto.schema");
const cloudinary = require("../helpers/cloudinary");
const path = require("path");

const obtenerTodosLosProductos = async (limit, to) => {
  /*   const productos = await ProductModel.find();
  return productos; */
  const [productos, cantidadTotal] = await Promise.all([
    ProductModel.find()
      .skip(to * limit)
      .limit(limit), // SKIP: define desde qué posición devuelve los documentos
    ProductModel.countDocuments(),
  ]);
  const paginacion = { productos, cantidadTotal };
  return paginacion;
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

const agregarImagen = async (idProducto, file) => {
  try {
    const producto = await ProductModel.findOne({ _id: idProducto });
    const resultado = await cloudinary.uploader.upload(file.path);
    producto.imagen = resultado.secure_url;
    await producto.save();
    return 200;
  } catch (error) {
    console.log(error);
  }
};

const buscarProducto = async (termino) => {
  try {
    console.log(termino)
    const reglaBusqueda = new RegExp(termino, 'i') // i: no importa el camel case
    const productos = await ProductModel.find({nombre: reglaBusqueda})
    return productos
  } catch (error) {
    console.log(error);
  }
};
// const buscarProducto = async (termino) => {
//   const reglaBusqueda = new RegExp(termino, 'i')
//   const productos = await ProductModel.find({
//     $or: [
//       {nombre: reglaBusqueda},
//       {descripcion: reglaBusqueda}
//     ]
//   })
//   return productos
// }
module.exports = {
  obtenerTodosLosProductos,
  obtenerUnProducto,
  nuevoProducto,
  editarProducto,
  eliminarProducto,
  agregarImagen,
  buscarProducto,
};
