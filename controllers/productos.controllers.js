const serviciosProductos = require('../services/productos.services')


const obtenerProducPorIdOTodos = async (req, res) => {
  try {
    let id = req.query.id;
    if (id) {
      // const producto = productos.find((prod) => prod.id === id);
      const producto = await serviciosProductos.obtenerUnProducto(id)
      res.status(200).json(producto);
    } else {
      const productos = await serviciosProductos.obtenerTodosLosProductos()
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
    const productoCreado = await serviciosProductos.nuevoProducto(req.body)
    await productoCreado.save()
    res.status(201).json(productoCreado);
  } catch (error) {
    res.status(500).json(error);
  }
};

const editarProductoXId = async (req, res) => {
  try {
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

module.exports = {
  obtenerProducPorIdOTodos,
  obtenerProductoPorParametro,
  crearProducto,
  editarProductoXId,
  eliminarProductoXId,
};
