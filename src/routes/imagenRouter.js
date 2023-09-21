const {Router} = require('express');
const { check } = require('express-validator');
const {validarCampos, validarArchivoSubir} = require('../middleware');
const { cargarArchivo, mostrarImagen, borrarImagen } = require('../controllers/imagenController');
const { colecionesPermitidas } = require('../helpers/idValidador');

const router = Router();

router.post('/:carpeta/:id',[
    validarArchivoSubir,
    check('id','Id no mongovalido').isMongoId(),
    check('carpeta','carpeta erronea').custom(c=> colecionesPermitidas(c,['blog','parametro','proyecto'])),
    validarCampos
],cargarArchivo);

router.get('/:carpeta/:imagen',[
//check('id','Id no mongovalido').isMongoId(),
check('carpeta','carpeta erronea').custom(c=> colecionesPermitidas(c,['blog','parametro','proyecto'])),
validarCampos],
mostrarImagen
)

router.delete('/:carpeta/:id',[
    check('id','Id no mongovalido').isMongoId(),
    check('carpeta','carpeta erronea').custom(c=> colecionesPermitidas(c,['blog','parametro','proyecto'])),
    validarCampos],
    borrarImagen
    )

module.exports = router;