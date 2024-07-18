const { Router } = require('express');
const { registrarUsuario, mostrarTodosLosUsuarios, mostrarUsuarioXId, bajaFisicaUsuario, bajaLogicaUsuario, iniciarSesion } = require('../controllers/usuarios.controllers');
const router = Router()
const { check } = require('express-validator');
const auth = require('../middlewares/auth');
//chech -> hace una validación más grande. Si quiero algo más específico puedo usar body/ params/ query

/* CREAR USUARIO */
router.post('/', [
    check('nombreUsuario', 'Campo USUARIO vacío').not().isEmpty(),
    check('nombreUsuario', 'min: 5 caracteres - max: 40 caracteres').isLength({min: 5, max: 40}),
    check('password', 'Campo CONTRASEÑA vacio').not().isEmpty(),
    check('password', 'min: 8 caracteres - max: 50 caracteres').isLength({min: 8, max: 50})
], registrarUsuario);
router.post('/login',[
    check('nombreUsuario', 'Campo USUARIO vacío').not().isEmpty(),
    check('password', 'Campo CONTRASEÑA vacio').not().isEmpty()
], iniciarSesion);

router.get('/', auth('admin'), mostrarTodosLosUsuarios);
router.get('/:idUsuario',[
    check('_id', 'Formato de id incorrecto').isMongoId()
], auth('admin'), mostrarUsuarioXId);

router.delete('/:idUsuario',auth('admin'), bajaFisicaUsuario);

router.put('/:idUsuario',auth('admin'), bajaLogicaUsuario)

module.exports = router