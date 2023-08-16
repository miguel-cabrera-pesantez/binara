const {Router} = require('express');
const { check } = require('express-validator');
const { existeMapaId } = require('../helpers/idValidador');
const router = Router();

const {mapaListar, mapaObtener, mapaCrear, mapaEditar, mapaBorrar} = require('../controllers/mapaController');
const {validarCampos, validarJSON} = require('../middleware');

// Lista todos los mapas
router.get('/',mapaListar);

// Encuentra un mapa por id
router.get('/:id',[
    check('id','Id Mongo no valido').isMongoId(),
    check('id').custom(existeMapaId),
    validarCampos,
],mapaObtener);

// Crea un mapa
router.post('/',[
    validarJSON,
    check('lugar','Lugar requerido').notEmpty(),
    check('coorX','Coordenada en x requerida').notEmpty(),
    check('coorX','Rango para x entre -90 a 90').isFloat({ min: -90, max: 90 }),
    check('coorY','Coordenada en y requerida').notEmpty(),
    check('coorY','Rango para y entre -180 a 180').isFloat({ min: -180, max: 180 }),
    validarCampos,
],mapaCrear);

//Modificar un mapa
router.put('/:id',[
    validarJSON,
    check('id','Id Mongo no valido').isMongoId(),
    check('id').custom(existeMapaId),
    check('coorY','Rango para y entre -180 a 180').optional().isFloat({ min: -180, max: 180 }),
    check('coorX','Rango para x entre -90 a 90').optional().isFloat({ min: -90, max: 90 }),
    validarCampos,
],mapaEditar);

//Eliminar un mapa
router.delete('/:id',[
    check('id','Id Mongo no valido').isMongoId(),
    check('id').custom(existeMapaId),
    validarCampos,
],mapaBorrar)

module.exports = router;