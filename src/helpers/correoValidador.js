const {Usuario} = require('../models');

const emailExiste = async(correo='')=>{
    const existeEmail = await Usuario.findOne({correo});
    if (existeEmail) {
        throw new Error(`El correo ${correo} ya existe`);
    }; 
}

const emailExisteOtro = async (correo, id) => {
    const usuarioModificado = await Usuario.findById(id);
    const otrosUsuarios = await Usuario.find({ _id: { $ne: id } });
    if (usuarioModificado && otrosUsuarios.some(usuario => usuario.correo === correo)) {
        throw new Error('El correo electrónico ya está en uso por otro usuario');
    }
};

module.exports={
    emailExiste,
    emailExisteOtro
}
