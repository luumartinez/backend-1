const express = require("express");
const { obtenerProducPorIdOTodos, crearProducto, editarProductoXId, eliminarProductoXId, obtenerProductoPorParametro } = require("../controllers/productos.controllers");
const router = express.Router();
/* También se puede desestructurar
const { Router } = require('express) -> trae directamente Router de la librerái express
*/

// GET
/* PARAMS */
router.get("/:idProducto", obtenerProductoPorParametro);

/* QUERY */
router.get("/", obtenerProducPorIdOTodos)

// POST
router.post("/", crearProducto);

// PUT
router.put("/:idProducto", editarProductoXId);

// DELETE
router.delete("/:idProducto", eliminarProductoXId);

module.exports = router