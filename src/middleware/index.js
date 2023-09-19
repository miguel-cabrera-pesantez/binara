const validarCampos = require('../middleware/validarCampos');
const validarJSON = require('../middleware/jsonValidador');
//const validarRol= require('../middleware/validarRol');
const validarJWT  = require('../middleware/validarJWT');
const validarArchivoSubir= require('../middleware/validarArchivo');

module.exports={
    ...validarCampos,
    ...validarJSON,
    ...validarJWT,
    //...validarRol,
    ...validarArchivoSubir
};
