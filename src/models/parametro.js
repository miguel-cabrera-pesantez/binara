const {Schema,model} = require('mongoose');

const ParametroSchema = Schema({
    llave:{
        type: String,
        require: [true,'llave requerida'],
    },
    texto1:{
        type: String,
        require: [true,'texto requerido'],
    },
    texto2:{
        type: String,
    },
    imagen:{
        type: String,
    },
    visible:{
        type:Boolean,
        default:true,
    },
});

ParametroSchema.methods.toJSON = function(){
    const{__v,...parametro}=this.toObject();
    return parametro;
};

module.exports=model('Parametro',ParametroSchema);