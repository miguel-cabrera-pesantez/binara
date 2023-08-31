const {Router} = require('express');
const { check } = require('express-validator');
const { login, renovarToken, googleSingIn } = require('../controllers/authController');
const { validarJWT, validarCampos } = require('../middleware');

const router = Router();

router.post('/psw',[
    check('correo','El correo es obligatorio').isEmail(),
    //check('correo').custom(emailExiste), comentado ya que no se debe especificar si el email existe o no
    check('password','La contraseña es obligatoria').notEmpty(),
    validarCampos
],login);

router.post('/google',[
    check('id_token','id_token es necesario').notEmpty(),
],googleSingIn);

//router.get('/',validarJWT, renovarToken);

module.exports = router;