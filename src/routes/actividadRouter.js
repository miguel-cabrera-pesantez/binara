const {Router} = require('express');
const { check } = require('express-validator');
const { actividadListarTodos, actividadListarActivos, actividadObtener, actividadCrear, actividadEditar, actividadDesactivar } = require('../controllers/actividadController');
const { existeActividadId, existeMapaId, existeUsuarioId } = require('../helpers/idValidador');
const { validarCampos } = require('../middleware/validarCampos');
const { validarJSON } = require('../middleware/jsonValidador');
const router = Router();

// Lista todas las actividades
router.get('/',actividadListarTodos);

// Lista todas las actividades visibles
router.get('/visibles',actividadListarActivos);

// Encuentra una actividad por id
router.get('/:id',[
    check('id','Id Mongo no valido').isMongoId(),
    check('id').custom(existeActividadId),
    validarCampos,
],actividadObtener);

// Crea una actividad
router.post('/',[
    validarJSON,
    check('titulo','Titulo requerido').notEmpty(),
    check('descripcion','Descripcion requerida').notEmpty(),
    check('mapa','Mapa de la actividad requerida').notEmpty(),
    check('mapa', 'ID de mapa no valido').isMongoId(),
    check('mapa').custom(existeMapaId),
    check('usuario','Usuario creador requerido').notEmpty(),
    check('usuario', 'ID de usuario no valido').isMongoId(),
    check('usuario').custom(existeUsuarioId),
    check('visible', 'visible debe ser un valor booleano').optional().isBoolean(),
    validarCampos,
],actividadCrear);

// Editar una actividad
router.put('/:id',[
    validarJSON,
    check('id','no es un id valido').isMongoId(),
    check('id').custom(existeActividadId),
    check('titulo','Titulo requerido').optional().notEmpty(),
    check('descripcion','Descripcion requerida').optional().notEmpty(),
    check('mapa','Mapa de la actividad requerida').optional().notEmpty(),
    check('mapa', 'ID de mapa no valido').optional().isMongoId(),
    check('mapa').optional().custom(existeMapaId),
    check('usuario','Usuario creador requerido').optional().notEmpty(),
    check('usuario', 'ID de usuario no valido').optional().isMongoId(),
    check('usuario').optional().custom(existeUsuarioId),
    check('visible', 'visible debe ser un valor booleano').optional().isBoolean(),
    validarCampos,
],actividadEditar);

//Desactivar usuario
router.delete('/:id',[
    check('id','Id Mongo no valido').isMongoId(),
    check('id').custom(existeActividadId),
    validarCampos
],actividadDesactivar);

module.exports = router;