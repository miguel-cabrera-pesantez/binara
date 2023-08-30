const {Router} = require('express');
const { check } = require('express-validator');
const { blogListarActivos, blogListarTodos, blogObtener, blogCrear, blogEditar, blogDesactivar } = require('../controllers/blogController');
const { existeBlogId } = require('../helpers/idValidador');
const { validarCampos, validarJSON } = require('../middleware');
const router = Router();

// Lista los blogs activos
router.get('/activos',blogListarActivos);

// Lista todos los blogs 
router.get('/',blogListarTodos);

// Encuentra un mapa por id
router.get('/:id',[
    check('id','Id Mongo no valido').isMongoId(),
    check('id').custom(existeBlogId),
    validarCampos,
],blogObtener);

// Crea un blog
router.post('/',[
    validarJSON,
    check('titulo','Titulo requerido').notEmpty(),
    check('texto','Contexto del blog requerido').notEmpty(),
    check('visible', 'visible debe ser un valor booleano').isBoolean(),   
    validarCampos,
],blogCrear);

//Modificar blog
router.put('/:id',[
    validarJSON,
    check('id','no es un id valido').isMongoId(),
    check('id').custom(existeBlogId),
    check('visible', 'visible debe ser un valor booleano').optional().isBoolean(),
    validarCampos
],blogEditar);

//Desactivar proyecto
router.delete('/:id',[
    check('id','Id Mongo no valido').isMongoId(),
    check('id').custom(existeBlogId),
    validarCampos
],blogDesactivar);

module.exports = router;