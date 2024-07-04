let productos = [
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

const obtenerProducPorIdOTodos = (req, res) => {
  try {
    let id = Number(req.query.id);
    if (id) {
      const producto = productos.find((prod) => prod.id === id);
      res.status(200).json(producto);
    } else {
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

const crearProducto = (req, res) => {
  try {
    const nuevoProducto = {
      id: productos[productos.length - 1].id + 1,
      ...req.body,
    };
    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json(error);
  }
};

const editarProductoXId = (req, res) => {
  try {
    const id = Number(req.params.idProducto);
    const posicionProdEnElArray = productos.findIndex((prod) => prod.id === id);
    const productoEditado = {
      id,
      ...req.body,
    };
    productos[posicionProdEnElArray] = productoEditado;
    res.status(200).json(productoEditado);
  } catch (error) {
    res.status(500).json(error);
  }
};

const eliminarProductoXId = (req, res) => {
  try {
    const id = Number(req.params.idProducto);
    const productosNoBorrados = productos.filter((prod) => prod.id !== id);
    productos = productosNoBorrados;
    res.status(200).json(productos);
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
