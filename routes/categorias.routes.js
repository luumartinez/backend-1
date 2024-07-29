const { Router } = require('express')
const { obtenerCategorias, obtenerUnaCategoria, crearCategoria, actualizarCategoria, eliminarCategoria } = require('../controllers/categorias.controlles')
const router = Router()

router.get('/', obtenerCategorias)
router.get('/:idCategoria', obtenerUnaCategoria)

router.post('/', crearCategoria)

router.put('/:idCategoria', actualizarCategoria)
router.delete('/:idCategoria', eliminarCategoria)

module.exports = router