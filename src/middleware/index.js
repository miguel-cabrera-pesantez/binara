const validarCampos = require('../middleware/validarCampos');
const validarJSON = require('../middleware/jsonValidador');
//onst validarJWT = require('../middleware/validar_jwt');
const validarRol= require('../middleware/validarRol');
//const validarArchivoSubir= require('../middleware/validar-archivo');

module.exports={
    ...validarCampos,
    ...validarJSON,
    //...validarJWT,
    ...validarRol,
    //...validarArchivoSubir
};
