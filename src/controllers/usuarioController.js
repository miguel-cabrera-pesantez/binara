const {response} = require('express');
const bcryptjs = require('bcryptjs');

const {Usuario} = require('../models');

const usuarioListar = async (req,res=response) =>{
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
}

const usuarioObtener = async (req,res=response) =>{
    const {id} = req.params;
    const usuario = await Usuario.findById(id);
    res.status(200).json({usuario});
}

const usuarioCrear = async (req,res=response) =>{
    const salt = bcryptjs.genSaltSync();
    const data = {
        ...req.body,
        nombre: req.body.nombre.toUpperCase(),
        password: bcryptjs.hashSync(req.body.password ,salt)       
    };
    const usuario = new Usuario(data);
    await usuario.save();
    res.status(201).json({
        msg:'Usuario guardado correctamente',
        usuario
    });
}

const usuarioEditar = async (req,res=response) =>{
    const {id} = req.params;
    const data = req.body;
    if(data.nombre){data.nombre = data.nombre.toUpperCase()};
    if(data.password){
        const salt = bcryptjs.genSaltSync();
        data.password = bcryptjs.hashSync(data.password,salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id,data, {new: true})
    res.status(201).json({
        msg:'Usuario actualizado correctamente',
        usuario
    });
};

const usuarioDesactivar = async (req,res=response) =>{
    const {id} =req.params;
    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false}, {new: true});
    res.status(201).json({
        msg:'Usuario desactivado correctamente: ',
        usuario
    });
 }

module.exports={
    usuarioListar,
    usuarioObtener,
    usuarioCrear,
    usuarioEditar,
    usuarioDesactivar
}