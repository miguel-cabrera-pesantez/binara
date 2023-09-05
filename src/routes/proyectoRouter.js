const {Router} = require('express');
const { check } = require('express-validator');
const { existeProyectoId, validarMapasExisten } = require('../helpers/idValidador');
const { proyectoListarTodos, proyectoListarActivos, proyectoObtener, proyectoCrear, proyectoEditar, proyectoDesactivar, proyectoActivar } = require('../controllers/proyectoController');
const { validarCampos } = require('../middleware/validarCampos');
const { validarJSON } = require('../middleware/jsonValidador');
const router = Router();

// Lista todos los proyectos
router.get('/',proyectoListarTodos);

// Lista todos los proyectos visibles
router.get('/visibles',proyectoListarActivos);

// Encuentra un proyecto por id
router.get('/:id',[
    check('id','Id Mongo no valido').isMongoId(),
    check('id').custom(existeProyectoId),
    validarCampos,
],proyectoObtener);

// Crea un proyecto
router.post('/',[
    validarJSON,
    check('titulo','Titulo requerido').notEmpty(),
    check('objetivoPrincipal','Objetivo principal requerido').notEmpty(),
    check('mapas','Debes proporcionar al menos un mapa').notEmpty(),
    check('mapas.*', 'ID de mapa no valido').isMongoId(),
    check('mapas').custom(validarMapasExisten),
    check('fechaInicio', 'Fecha de inicio requerida').notEmpty(),
    check('fechaFin', 'Fecha de fin requerida').notEmpty(),
    //check('fechaInicio', 'Formato fecha requerido').isDate(),
    //check('fechaFin', 'Formato fecha requerido').isDate(),
    check('visible', 'visible debe ser un valor booleano').optional().isBoolean(),
    validarCampos,
],proyectoCrear);

//Modificar proyecto
router.put('/:id',[
    validarJSON,
    check('id','no es un id valido').isMongoId(),
    check('id').custom(existeProyectoId),
    check('mapas.*', 'ID de mapa no valido').optional().isMongoId(),
    check('mapas').optional().custom(validarMapasExisten),
    check('visible', 'visible debe ser un valor booleano').optional().isBoolean(),
    validarCampos
],proyectoEditar);

//Desactivar proyecto
router.delete('/:id',[
    check('id','Id Mongo no valido').isMongoId(),
    check('id').custom(existeProyectoId),
    validarCampos
],proyectoDesactivar);

//Activar proyecto
router.put('/:id/activar', [
    check('id', 'Id Mongo no válido').isMongoId(),
    check('id').custom(existeProyectoId),
    validarCampos
], proyectoActivar);

module.exports = router;