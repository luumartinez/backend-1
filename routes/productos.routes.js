const express = require("express");
const { obtenerProducPorIdOTodos, crearProducto, editarProductoXId, eliminarProductoXId, obtenerProductoPorParametro } = require("../controllers/productos.controllers");
const router = express.Router();
const { check } = require('express-validator')
/* También se puede desestructurar
const { Router } = require('express) -> trae directamente Router de la librerái express
*/

// GET
/* PARAMS */
router.get("/:idProducto", obtenerProductoPorParametro);

/* QUERY */
router.get("/", obtenerProducPorIdOTodos)

// POST
router.post("/", [
    check('nombre', 'Campo NOMBRE vacío').not().isEmpty(),
    check('precio', 'Campo PRECIO vacío').not().isEmpty(),
    check('descripcion', 'Campo DESCRIPCION vacío').not().isEmpty()
], crearProducto);

// PUT
router.put("/:idProducto", [
    check('nombre', 'Campo NOMBRE vacío').not().isEmpty(),
    check('precio', 'Campo PRECIO vacío').not().isEmpty(),
    check('descripcion', 'Campo DESCRIPCION vacío').not().isEmpty()
], editarProductoXId);

// DELETE
router.delete("/:idProducto", eliminarProductoXId);

module.exports = router