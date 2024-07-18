const express = require("express");
const { obtenerProducPorIdOTodos, crearProducto, editarProductoXId, eliminarProductoXId, obtenerProductoPorParametro, agregarImagenXId, buscarProductoPorTermino } = require("../controllers/productos.controllers");
const router = express.Router();
const { check } = require('express-validator');
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer");
/* También se puede desestructurar
const { Router } = require('express) -> trae directamente Router de la librerái express
*/

// GET
/* PARAMS */
router.get("/:idProducto", obtenerProductoPorParametro);

/* QUERY */
router.get("/", obtenerProducPorIdOTodos)

router.get('/buscar', buscarProductoPorTermino)

// POST
router.post("/", [
    check('nombre', 'Campo NOMBRE vacío').not().isEmpty(),
    check('precio', 'Campo PRECIO vacío').not().isEmpty(),
    check('descripcion', 'Campo DESCRIPCION vacío').not().isEmpty()
], auth('admin'), crearProducto);

router.post('/agregarImagen/:idProducto',multer.single('imagen'), agregarImagenXId) 
//multer.single => revisa el nombre que tiene que revisar. Sería la "key" por la que se manda el archivo

// PUT
router.put("/:idProducto", [
    check('nombre', 'Campo NOMBRE vacío').not().isEmpty(),
    check('precio', 'Campo PRECIO vacío').not().isEmpty(),
    check('descripcion', 'Campo DESCRIPCION vacío').not().isEmpty()
],auth('admin'), editarProductoXId);

// DELETE
router.delete("/:idProducto", auth('admin'),eliminarProductoXId);

module.exports = router