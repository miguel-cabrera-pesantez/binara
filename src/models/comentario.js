const {Schema,model} = require('mongoose');

const ComentarioSchema = Schema({
    texto:{
        type: String,
        require: [true,'lugar requerido'],
    },
    usuario:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
    },
    blog:{
        type:Schema.Types.ObjectId,
        ref:'Blog',
    },
    fechaComentario:{
        type: Date,
        default: Date.now,
    },
    visible:{
        type:Boolean,
        default:true,
    },
});

ComentarioSchema.methods.toJSON = function(){
    const{__v,...comentario}=this.toObject();
    return comentario;
};

module.exports=model('Comentario',ComentarioSchema);