const {Schema,model} = require('mongoose');

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
    num_areas:{
        type: Number,
        default: 0
    },
    num_personas_beneficiarias:{
        type: Number,
        default: 0
    },
    num_mujeres_beneficiarias:{
        type: Number,
        default: 0
    },
    num_niños_niñas_beneficiarias:{
        type: Number,
        default: 0
    },
    num_adoloscentes_beneficiarios:{
        type: Number,
        default: 0
    },
    num_adultos_beneficiarios:{
        type: Number,
        default: 0
    },
    visible:{
        type:Boolean,
        default:true,
    }
});

ProyectoSchema.methods.toJSON = function(){
    const{__v,password,_id, ...proyecto} = this.toObject();
    proyecto.uid=_id;
    return proyecto;
}

module.exports=model('Proyecto',ProyectoSchema);