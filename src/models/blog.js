const {Schema,model} = require('mongoose');

const BlogSchema = Schema({
    titulo:{
        type: String,
        require: [true,'titulo requerido'],
    },
    fechaPublicacion:{
        type: Date,
        default: Date.now,
    },
    autores:{
        type: [String],
        default: ['Sin Autor']
    },
    foto:{
        type: String,
    },
    texto:{
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