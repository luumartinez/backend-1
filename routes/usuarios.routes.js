const { Router } = require('express');
const { registrarUsuario, mostrarTodosLosUsuariosOUno, mostrarUsuarioXId, bajaFisicaUsuario, bajaLogicaUsuario } = require('../controllers/usuarios.controllers');
const router = Router()

/* CREAR USUARIO */
router.post('/', registrarUsuario);

router.get('/', mostrarTodosLosUsuariosOUno);
router.get('/:idUsuario', mostrarUsuarioXId);

router.delete('/:idUsuario', bajaFisicaUsuario);

router.put('/:idUsuario', bajaLogicaUsuario)

module.exports = router