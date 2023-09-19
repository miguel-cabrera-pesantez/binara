const {response} = require('express');
const {Actividad,Proyecto} = require('../models');

const actividadListarTodos = async (req,res=response) =>{
    const actividades = await Actividad.find()
    .populate('mapa')
    .populate('usuario')
    .populate({
        path: 'proyecto',
        model: Proyecto,
      });
    res.status(200).json(actividades);
}

const actividadListarActivos = async (req,res=response) =>{
    const actividad = await Actividad.find({visible:true})
        .populate('mapa')
        .populate('usuario')
        .populate({
            path: 'proyecto',
            model: Proyecto,
          });
    res.status(200).json(actividad);
}

const actividadListarxProyecto = async (req,res=response) =>{
    const { proyectoId } = req.params;
    const actividad = await Actividad.find({ proyecto: proyectoId, visible: true })
        .populate('mapa')
        .populate('usuario')
        .populate({
            path: 'proyecto',
            model: Proyecto,
          });
    res.status(200).json(actividad);
}

const actividadObtener = async (req,res=response) =>{
    const {id} = req.params;
    const actividad = await Actividad.findById(id)
        .populate('mapa')
        .populate('usuario')
        .populate('proyecto');
    res.status(200).json({actividad});
}

const actividadCrear = async (req,res=response) =>{
    const data = {
        ...req.body   
    };
    const actividad = new Actividad(data);
    await actividad.save();
    res.status(201).json({
        msg:'Actividad guardada correctamente',
        actividad
    });
}

const actividadEditar = async (req,res=response) =>{
    const {id} = req.params;
    const data = {
        ...req.body,               
    };  
    const actividad = await Actividad.findByIdAndUpdate(id,data, {new: true});    
    res.status(201).json({
        msg:'Actividad modificada correctamente',
        actividad
    });
}

const actividadDesactivar = async (req,res=response) =>{
    const {id} =req.params;
    const actividad = await Actividad.findByIdAndUpdate(id,{visible:false}, {new: true});
    res.status(201).json({
        msg:'Actividad desactivada correctamente: ',
        actividad
    });
 }

 const activarActividad = async (req, res = response) => {
    try {
        const { id } = req.params;
        const actividades = await Actividad.findByIdAndUpdate(id, { visible: true }, { new: true });
        if (!actividades) {
            return res.status(404).json({
                msg: 'La actividad no se encontró',
            });
        }
        res.status(201).json({
            msg: 'Actividad activado correctamente',
            actividades,
        });
    } catch (error) {
        console.error('Error al activar la actividad:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
        });
    }
};

module.exports={
    actividadListarTodos,
    actividadListarActivos,
    actividadObtener,
    actividadCrear,
    actividadEditar,
    actividadDesactivar,
    actividadListarxProyecto,
    activarActividad,
}