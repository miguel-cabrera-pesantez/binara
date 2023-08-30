const {Schema,model} = require('mongoose');

const ActividadSchema = Schema({
    titulo:{
        type: String,
        required: [true,'titulo requerido']
    },
    descripcion:{
        type: String,
        required: [true,'descripcion requerido']
    },
    mapa:{
        type:Schema.Types.ObjectId,
        ref:'Mapa',
    },
    usuario:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
    },
    proyecto:{
        type:Schema.Types.ObjectId,
        ref:'proyecto',
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
    },
});

module.exports=model('Actividad',ActividadSchema);