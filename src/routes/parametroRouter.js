const {Router} = require('express');
const { check } = require('express-validator');
const { parametroListar, parametroObtener, parametroCrear, parametroEditar, parametroDesactivar, parametroObtenerxLlave } = require('../controllers/parametroController');
const { existeParametroId } = require('../helpers/idValidador');
const { validarCampos, validarJSON } = require('../middleware');
const router = Router();

// Lista todos los parametros 
router.get('/',parametroListar);

// Encuentra un parametro por id
router.get('/:id',[
    check('id','Id Mongo no valido').isMongoId(),
    check('id').custom(existeParametroId),
    validarCampos,
],parametroObtener);

// Encuentra un parametro por llave
router.get('/:llave',[
    check('llave','Llave requerida').notEmpty(),
    validarCampos,
],parametroObtenerxLlave);

// Crea un parametro
router.post('/',[
    validarJSON,
    check('llave','Llave requerida').notEmpty(),
    check('texto1','Texto requerido').notEmpty(),
    check('visible', 'visible debe ser un valor booleano').isBoolean(),   
    validarCampos,
],parametroCrear);

//Modificar un parametro
router.put('/:id',[
    validarJSON,
    check('id','Id Mongo no valido').isMongoId(),
    check('id').custom(existeParametroId),
    check('visible', 'visible debe ser un valor booleano').optional().isBoolean(),   
    validarCampos,
],parametroEditar);

//Desactivar/activar parametro
router.delete('/:id',[
    check('id','Id Mongo no valido').isMongoId(),
    check('id').custom(existeParametroId),
    validarCampos
],parametroDesactivar);

module.exports = router;


