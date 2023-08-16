const {response} = require('express');

const {Proyecto} = require('../models');

const proyectoListarTodos = async (req,res=response) =>{
    const proyecto = await Proyecto.find()
        .populate('mapas');
    res.status(200).json(proyecto);
}

const proyectoListarActivos = async (req,res=response) =>{
    const proyecto = await Proyecto.find({visible:true})
        .populate('mapas');
    res.status(200).json(proyecto);
}

const proyectoObtener = async (req,res=response) =>{
    const {id} = req.params;
    const proyecto = await Proyecto.findById(id)
        .populate('mapas');
    res.status(200).json({proyecto});
}

const proyectoCrear = async (req,res=response) =>{
    const data = {
        ...req.body,               
    };
    const tituloExiste = await Proyecto.findOne({titulo: data.titulo});
    if(tituloExiste){
        return res.status(400).json({
            msg:`El titulo del proyecto ${tituloExiste.titulo}, ya existe`
        });
    }
    const proyecto = new Proyecto(data);
    await proyecto.save();
    res.status(201).json({
        msg:'Proyecto guardado correctamente',
        proyecto
    });
}

const proyectoEditar = async (req,res=response) =>{
    const {id} = req.params;
    const data = {
        ...req.body,               
    };
    if(data.titulo){
        const tituloExiste = await Proyecto.findOne({ titulo: data.titulo, _id: { $ne: id } });
        if(tituloExiste){
            return res.status(400).json({
                msg:`El titulo del proyecto ${tituloExiste.titulo}, ya existe`
            });
        }
    }    
    const proyecto = await Proyecto.findByIdAndUpdate(id,data, {new: true});    
    res.status(201).json({
        msg:'Proyecto modificado correctamente',
        proyecto
    });
}

const proyectoDesactivar = async (req,res=response) =>{
    const {id} =req.params;
    const proyecto = await Proyecto.findByIdAndUpdate(id,{visible:false}, {new: true});
    res.status(201).json({
        msg:'proyecto desactivado correctamente: ',
        proyecto
    });
 }

module.exports={
    proyectoListarTodos,
    proyectoListarActivos,
    proyectoObtener,
    proyectoCrear,
    proyectoEditar,
    proyectoDesactivar
}