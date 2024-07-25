const ProductModel = require("../models/producto.schema");
const cloudinary = require("../helpers/cloudinary");
const path = require("path");
const UsuarioModel = require("../models/usuarios.schema");
const CarritoModel = require("../models/carrito.schema");
const FavModel = require("../models/favoritos.schema");

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
    console.log(termino);
    const reglaBusqueda = new RegExp(termino, "i"); // i: no importa el camel case
    const productos = await ProductModel.find({
      $or: [{ nombre: reglaBusqueda }, { descripcion: reglaBusqueda }],
    });
    return productos;
  } catch (error) {
    console.log(error);
  }
};

const agregarAlCarrito = async (idUsuario, idProducto) => {
  try {
    const usuario = await UsuarioModel.findById(idUsuario);
    // find: devuelve + de un dato (un objeto)
    // findOne: devuelve solo el dato que matchea -> propiedad y clave.
    // findById: no hace falta aclarar porque ya busca si o sí en _id
    const producto = await ProductModel.findOne({ _id: idProducto });
    const carrito = await CarritoModel.findOne({ _id: usuario.idCarrito });

    const productoExistente = carrito.productos.find(
      (prod) => prod._id.toString() === producto.id.toString()
    );
    if (productoExistente) {
      return {
        msg: "El producto ya se agregó",
        statusCode: 400
      };
    }
    carrito.productos.push(producto);
    await carrito.save();
    return {
      msg: 'Producto agregado correctamente',
      statusCode: 200
    };
  } catch (error) {
    console.log(error);
  }
};

const eliminarDelCarrito = async (idUsuario, idProducto) => {
  try {
    const usuario = await UsuarioModel.findById(idUsuario);
    const producto = await ProductModel.findOne({ _id: idProducto });
    const carrito = await CarritoModel.findOne({ _id: usuario.idCarrito });

    const posicionProducto = carrito.productos.findIndex((prod) => prod._id.toString() === producto.id.toString())
    if(posicionProducto < 0){
      return {
        msg: 'No se encontró el producto que buscas',
        statusCode: 400
      }
    }
    carrito.productos.splice(posicionProducto, 1)
    
    await carrito.save();
    return {
      msg: 'Producto eliminado correctamente',
      statusCode: 200
    };
  } catch (error) {
    console.log(error);
  }
};

const agregarAFavs = async (idUsuario, idProducto) => {
  try {
    const usuario = await UsuarioModel.findById(idUsuario);
    const producto = await ProductModel.findOne({ _id: idProducto });
    const favoritos = await FavModel.findOne({ _id: usuario.idFavoritos });

    const productoExistente = favoritos.productos.find(
      (prod) => prod._id.toString() === producto.id.toString()
    );
    if (productoExistente) {
      return {
        msg: "El producto ya se marcó como Favorito",
        statusCode: 400
      };
    }
    favoritos.productos.push(producto);
    await favoritos.save();
    return {
      msg: 'Producto agregado correctamente',
      statusCode: 200
    };
  } catch (error) {
    console.log(error);
  }
};

const eliminarDeFavs = async (idUsuario, idProducto) => {
  try {
    const usuario = await UsuarioModel.findById(idUsuario);
    const producto = await ProductModel.findOne({ _id: idProducto });
    const favoritos = await FavModel.findOne({ _id: usuario.idFavoritos });

    const posicionProducto = favoritos.productos.findIndex((prod) => prod._id.toString() === producto.id.toString())
    if(posicionProducto < 0){
      return {
        msg: 'No se encontró el producto que buscas',
        statusCode: 400
      }
    }
    favoritos.productos.splice(posicionProducto, 1)
    
    await favoritos.save();
    return {
      msg: 'Producto eliminado de favoritos correctamente',
      statusCode: 200
    };
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
  agregarImagen,
  buscarProducto,
  agregarAlCarrito,
  eliminarDelCarrito,
  agregarAFavs,
  eliminarDeFavs
};
