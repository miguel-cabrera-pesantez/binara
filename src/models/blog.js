const {Schema,model} = require('mongoose');

const BlogSchema = Schema({
    titulo:{
        type: String,
        require: [true,'titulo requerido'],
    },
    fecha:{
        type: Date,
        default: Date.now,
    },
    nombre_autor:{
        type: String
    },
    apellido_autor:{
        type: String,
    },
    email_autor:{
        type: String,
    },
    foto:{
        type: String,
    },
    parrafo:{
        type: String,
    },
    bibliografia:{
        type: String,
    },
    visible:{
        type:Boolean,
        default:true,
    },
});

BlogSchema.methods.toJSON = function(){
    const{__v,...blog}=this.toObject();
    return blog;
};

module.exports=model('Blog',BlogSchema);