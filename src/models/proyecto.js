const {Schema,model} = require('mongoose');
const mapa = require('./mapa');

const ProyectoSchema = Schema({
    titulo:{
        type: String,
        require: [true,'titulo requerido'],
    },
    objetivoPrincipal:{
        type: String,
        require: [true,'objetivo principal requerido'],
    },
    objetivosSecundarios:{
        type: [String],
        default: []
    },/*
    mapas:{
        type:[mapa.MapaSchema],
        ref:'Mapa',
        //default:[]
    },*/
    mapas: [{
        type: Schema.Types.ObjectId,
        ref: 'Mapa'
    }],
    parrafoUno:{
        type: String,
    },
    parrafoDos:{
        type: String,
    },
    parrafoTres:{
        type: String,
    },
    portada:{
        type: String,
    },
    presupuesto:{
        type: Number,
        default: 0
    },
    recolectado:{
        type: Number,
        default: 0
    },
    fechaInicio:{
        type: Date,
        default: Date.now,
    },
    fechaFin:{
        type: Date,
    },
    visible:{
        type:Boolean,
        default:true,
    }
});

module.exports=model('Proyecto',ProyectoSchema);