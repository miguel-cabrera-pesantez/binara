const {Router} = require('express');
const { check } = require('express-validator');
const { comentarioListar, comentariosBlog, comentarioObtener, comentarioCrear, comentarioDesactivar, comentarioObtenerUsuario } = require('../controllers/comentarioController');
const { existeBlogId, existeComentariosId, existeUsuarioId } = require('../helpers/idValidador');
const { validarCampos, validarJSON } = require('../middleware');
const router = Router();

// Lista todos los comentarios 
router.get('/',comentarioListar);

// Lista todos los comentarios por blog
router.get('/xblog/:id',[
    check('id','Id Mongo no valido').isMongoId(),
    check('id').custom(existeBlogId),
    validarCampos,
],comentariosBlog);

// Lista todos los comentarios por blog
router.get('/xusuario/:id',[
    check('id','Id Mongo no valido').isMongoId(),
    check('id').custom(existeUsuarioId),
    validarCampos,
],comentarioObtenerUsuario);

// Encuentra un comentario por id
router.get('/:id',[
    check('id','Id Mongo no valido').isMongoId(),
    check('id').custom(existeComentariosId),
    validarCampos,
],comentarioObtener);

// Crea un comentario
router.post('/',[
    validarJSON,
    check('texto','Texto requerido').notEmpty(),
    check('usuario','Id Mongo no valido').isMongoId(),
    check('usuario').custom(existeUsuarioId),
    check('visible', 'visible debe ser un valor booleano').isBoolean(),   
    validarCampos,
],comentarioCrear);

//Desactivar comentario
router.delete('/:id',[
    check('id','Id Mongo no valido').isMongoId(),
    check('id').custom(existeComentariosId),
    validarCampos
],comentarioDesactivar);

module.exports = router;