const {Schema,model} = require('mongoose');

const MapaSchema = Schema({
    lugar:{
        type: String,
        require: [true,'lugar requerido'],
    },
    coorX:{
        type: String,
        require: [true,'coordenada en X requerida'],
    },
    coorY:{
        type: String,
        require: [true,'coordenada en Y requerida'],
    },
});

MapaSchema.methods.toJSON = function(){
    const{__v,...mapa}=this.toObject();
    return mapa;
};

module.exports=model('Mapa',MapaSchema);