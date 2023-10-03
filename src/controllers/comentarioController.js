const {response} = require('express');
const {Comentario} = require('../models');

const comentarioListar = async (req,res=response) =>{
    const comentarios = await Comentario.find()
    .populate('usuario')
    .populate('blog');
    res.status(200).json(comentarios);
}

const comentariosBlog = async (req,res=response) =>{
    const {id} = req.params;
    const comentarios = await Comentario.find({ blog: id })
    .populate('usuario')
    .populate('blog');
    res.status(200).json(comentarios);
}

const comentarioObtener = async (req,res=response) =>{
    const {id} = req.params;
    const comentario = await Comentario.findById(id)
        .populate('usuario')
        .populate('blog');
    res.status(200).json({comentario});
}

const comentarioCrear = async (req,res=response) =>{
    const data = {
        ...req.body,   
        fechaComentario : Date.now(),           
    };

    const comentario = new Comentario(data);
    await comentario.save();
    res.status(201).json({
        msg:'Comentario guardado correctamente',
        comentario
    });
}

const comentarioEditar = async (req,res=response) =>{
    const {id} = req.params;
    const data = {
        ...req.body,
        fechaComentario : Date.now(),               
    };  
    const comentario = await Comentario.findByIdAndUpdate(id,data, {new: true});    
    res.status(201).json({
        msg:'Comentario modificado correctamente',
        comentario
    });
}

const comentarioDesactivar = async (req,res=response) =>{
    const {id} =req.params;
    const comentario = await Comentario.findByIdAndUpdate(id,{visible:false}, {new: true});
    res.status(201).json({
        msg:'Comentario desactivado correctamente: ',
        comentario
    });
 }

 const comentarioObtenerUsuario = async (req,res=response) =>{
    const {id} = req.params;
    const comentario = await Comentario.find({ usuario: id })
        .populate('usuario')
        .populate('blog');
    res.status(200).json({comentario});
}

module.exports={
    comentarioListar,
    comentariosBlog,
    comentarioObtener,
    comentarioCrear,
    comentarioEditar,
    comentarioDesactivar,
    comentarioObtenerUsuario,
}