const ProductModel = require('../models/producto.schema');
const serviciosProductos = require('../services/productos.services')
const {validationResult} = require('express-validator')


const obtenerProducPorIdOTodos = async (req, res) => {
  try {
    let id = req.query.id;
    const limit = req.query.limit || 10
    const to = req.query.to || 0

    if (id) {
      // const producto = productos.find((prod) => prod.id === id);
      const producto = await serviciosProductos.obtenerUnProducto(id)
      res.status(200).json(producto);
    } else {
      const productos = await serviciosProductos.obtenerTodosLosProductos(limit, to)
      res.status(200).json(productos);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const obtenerProductoPorParametro = (req, res) => {
  try {
    const id = Number(req.params.idProducto); //es necesario parsearlo porque si no lo toma como string
    const producto = productos.find((prod) => prod.id === id);
    if (producto) {
      res.status(200).json(producto);
    } else {
      res.status(404).json('Producto no encontrado')
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const crearProducto = async (req, res) => {
  try {
    const {errors} = validationResult(req)
    if(errors.length){
      return res.status(400).json({msg: errors[0].msg})
    }
    const productoCreado = await serviciosProductos.nuevoProducto(req.body)
    await productoCreado.save()
    res.status(201).json(productoCreado);
  } catch (error) {
    res.status(500).json(error);
  }
};

const editarProductoXId = async (req, res) => {
  try {
    const {errors} = validationResult(req)
    if(errors.length){
      return res.status(400).json({msg: errors[0].msg})
    }
    const id = req.params.idProducto;
    const productoActualizado = await serviciosProductos.editarProducto(id, req.body)
    res.status(200).json(productoActualizado);
  } catch (error) {
    res.status(500).json(error);
  }
};

const eliminarProductoXId = async(req, res) => {
  try {
    const id = req.params.idProducto;
    let resultado = await serviciosProductos.eliminarProducto(id)
    if(resultado === 200){
      res.status(200).json("Producto Eliminado");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const agregarImagenXId = async (req, res) =>{
  try {
    const resultado = await serviciosProductos.agregarImagen(req.params.idProducto, req.file)
    if(resultado === 200){
      return res.status(200).json({msg:'Imagen agregada'})
    } 
  } catch (error) {
    console.log(error)
  }
}

const buscarProductoPorTermino = async (req, res) =>{
  try {
    const resultado = await serviciosProductos.buscarProducto(req.query.termino)
    return res.status(200).json(resultado)
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  obtenerProducPorIdOTodos,
  obtenerProductoPorParametro,
  crearProducto,
  editarProductoXId,
  eliminarProductoXId,
  agregarImagenXId,
  buscarProductoPorTermino
};
