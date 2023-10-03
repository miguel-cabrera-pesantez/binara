const {Router} = require('express');
const router = Router();
const { check } = require('express-validator');
const {correoEnviar} = require('../controllers/mailSendController');
const { validarCampos } = require('../middleware');

router.get('/',[
    check('nombre','Nombres requeridos').notEmpty(),
    check('correo','Correo requerido').notEmpty(),
    check('telefono','Telefono requerido').notEmpty(),
    check('asunto','Asunto requerido').notEmpty(),
    check('comentario','Comentario requerido').notEmpty(),
    validarCampos,
],correoEnviar);

module.exports = router;