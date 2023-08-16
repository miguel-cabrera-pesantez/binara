const {Schema,model} = require('mongoose');
const UsuarioSchema = Schema({
    nombre:{
        type: String,
        required: [true,'nombre requerido'],
    },
    correo:{
        type:String,
        required: [true,'correo requerido'],
        unique:true
    },
    password:{
        type:String,
        required: [true,'contraseña requerido'],
    },
    rol:{
        type:String,
        default:'USER_ROLE',
        required: true,
        emun: ['ADMIN_ROLE','USER_ROLE'],
    },
    estado:{
        type:Boolean,
        default:true,
    },
    google:{
        type:Boolean,
        default:false,
    },
    
});

UsuarioSchema.methods.toJSON = function(){
    const{__v,password,_id, ...usuario} = this.toObject();
    usuario.uid=_id;
    return usuario;
}

module.exports=model('Usuario',UsuarioSchema);