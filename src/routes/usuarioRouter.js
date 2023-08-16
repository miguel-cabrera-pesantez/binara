const {Router} = require('express');
const { check } = require('express-validator');
const { existeUsuarioId } = require('../helpers/idValidador');
const { usuarioListar, usuarioEditar, usuarioDesactivar, usuarioObtener, usuarioCrear } = require('../controllers/usuarioController');
const { validarJSON } = require('../middleware');
const { validarCampos } = require('../middleware/validarCampos');
const { emailExiste, emailExisteOtro } = require('../helpers/correoValidador');
const router = Router();

// Lista todos los usuarios
router.get('/',usuarioListar);

// Encuentra un usuario por id
router.get('/:id',[
    check('id','Id Mongo no valido').isMongoId(),
    check('id').custom(existeUsuarioId),
    validarCampos,
],usuarioObtener);

// Crea un usuario
router.post('/',[
    validarJSON,
    check('nombre','El nombre es obligatorio').notEmpty(),
    check('nombre').custom(value => /^[A-Za-z\s]+$/.test(value)).withMessage('El nombre debe contener solo letras y espacios'),
    check('password','Contraseña obligatoria').notEmpty(),
    check('password')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
        .matches(/^(?=.*[A-Z])(?=.*\d)/).withMessage('La contraseña debe contener al menos una mayuscula y un numero'),
    check('correo', 'Correo electrónico obligatorio').notEmpty(),
    check('correo', 'Formato de correo electrónico no valido').isEmail(),
    check('correo').custom(emailExiste),
    check('rol','Rol incorrecto').isIn(['ADMIN_ROLE','USER_ROLE']),
    validarCampos,
],usuarioCrear);

//Modificar usuario
router.put('/:id',[
    validarJSON,
    check('id','no es un id valido').isMongoId(),
    check('id').custom(existeUsuarioId),
    check('nombre').optional().custom(value => /^[A-Za-z\s]+$/.test(value)).withMessage('El nombre debe contener solo letras y espacios'),
    check('password')
        .optional()
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
        .matches(/^(?=.*[A-Z])(?=.*\d)/).withMessage('La contraseña debe contener al menos una mayuscula y un numero'),
    check('correo', 'Formato de correo electrónico no valido')
        .optional()
        .isEmail(),
    check('correo').custom((correo, { req }) => emailExisteOtro(correo, req.params.id)),
    check('rol','Rol incorrecto')
        .optional()
        .isIn(['ADMIN_ROLE','USER_ROLE']),
    validarCampos
],usuarioEditar);

//Desactivar usuario
router.delete('/:id',[
    check('id','Id Mongo no valido').isMongoId(),
    check('id').custom(existeUsuarioId),
    validarCampos
],usuarioDesactivar);

module.exports = router;