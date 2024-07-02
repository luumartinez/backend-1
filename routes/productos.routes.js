const express = require("express");
const { obtenerProducPorIdOTodos, crearProducto, editarProductoXId, eliminarProductoXId } = require("../controllers/productos.controllers");
const router = express.Router();
/* También se puede desestructurar
const { Router } = require('express) -> trae directamente Router de la librerái express
*/

// GET
/* PARAMS */
router.get("/:idProducto", (req, res) => {
  const id = Number(req.params.idProducto); //es necesario parsearlo porque si no lo toma como string
  const producto = productos.find((prod) => prod.id === id);
  res.status(200).json(producto);
});

/* QUERY */
router.get("/", obtenerProducPorIdOTodos)

// POST
router.post("/", crearProducto);

// PUT
router.put("/:idProducto", editarProductoXId);

// DELETE
router.delete("/:idProducto", eliminarProductoXId);

module.exports = router