const { Router } = require('express');
const { registrarUsuario, mostrarTodosLosUsuarios, mostrarUsuarioXId, bajaFisicaUsuario, bajaLogicaUsuario, iniciarSesion } = require('../controllers/usuarios.controllers');
const router = Router()

/* CREAR USUARIO */
router.post('/', registrarUsuario);
router.post('/login', iniciarSesion);

router.get('/', mostrarTodosLosUsuarios);
router.get('/:idUsuario', mostrarUsuarioXId);

router.delete('/:idUsuario', bajaFisicaUsuario);

router.put('/:idUsuario', bajaLogicaUsuario)

module.exports = router