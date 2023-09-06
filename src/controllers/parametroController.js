const {response} = require('express');
const {Parametro} = require('../models');

const parametroListar = async (req,res=response) =>{
    const parametros = await Parametro.find()
    res.status(200).json(parametros);
}

const parametroObtener = async (req,res=response) =>{
    const {id} = req.params;
    const parametro = await Parametro.findById(id);
    res.status(200).json({parametro});
}

const parametroCrear = async (req,res=response) =>{
    const data = {
        ...req.body,         
    };

    const parametro = new Parametro(data);
    await parametro.save();
    res.status(201).json({
        msg:'Parametro guardado correctamente',
        parametro
    });
}

const parametroEditar = async (req,res=response) =>{
    const {id} = req.params;
    const data = {
        ...req.body,            
    };  
    const parametro = await Parametro.findByIdAndUpdate(id,data, {new: true});    
    res.status(201).json({
        msg:'Parametro modificado correctamente',
        parametro
    });
}

const parametroDesactivar = async (req,res=response) =>{
    const {id} =req.params;
    const {visible} = await Parametro.findById(id,'visible');//recogo el valor actual
    const parametro = await Parametro.findByIdAndUpdate(id,{visible:!visible}, {new: true});//invierto el valor actual
    
    res.status(201).json({
        msg:'Parametro desactivado correctamente: ',
        parametro
    });
 }

module.exports={
    parametroListar,
    parametroObtener,
    parametroCrear,
    parametroEditar,
    parametroDesactivar,
}