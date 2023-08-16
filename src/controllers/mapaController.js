const {response} = require('express');
const {Mapa,Proyecto} = require('../models');

const mapaListar = async (req,res=response) =>{
    const mapas = await Mapa.find();
    res.status(200).json(mapas);
}

const mapaObtener = async (req,res=response) =>{
    const {id} = req.params;
    const mapa = await Mapa.findById(id);
    res.status(200).json({mapa});
}

const mapaCrear = async (req,res=response) =>{
    const data = {
        ...req.body,
        lugar: req.body.lugar.toUpperCase(),        
    }
    const mapa = new Mapa(data);
    await mapa.save();
    res.status(201).json({
        msg:'Mapa guardado correctamente',
        mapa
    });
}

const mapaEditar = async (req,res=response) =>{
    const {id} = req.params;
    const data = req.body;
    if(data.lugar){data.lugar = data.lugar.toUpperCase()};
    const mapa = await Mapa.findByIdAndUpdate(id,data, {new: true})
    res.status(201).json({
        msg:'Mapa actualizado correctamente',
        mapa
    });
};

const mapaBorrar = async (req,res=response) =>{
    const {id} = req.params;
    // Verificar si el mapa está referenciado en alguna actividad
   /* const actividadUsaMapa = await Actividad.findOne({ mapa: id });
    if (actividadUsaMapa) {
        return res.status(400).json({
            msg: `Estemapa esta referenciado en la actividad ${actividadUsaMapa._id}.`
        });
    }*/
    // Verificar si el mapa es el único en algún proyecto
    const proyectosConMapa = await Proyecto.find({ mapas: id });
    console.log('------------------------>>>>',proyectosConMapa);
    if (proyectosConMapa.length === 1 && proyectosConMapa[0].mapas.length === 1) {
        return res.status(400).json({
            msg: `Este mapa es el unico en el proyecto ${proyectosConMapa[0].titulo}.`
        });
    }
    // Actualizar proyectos para eliminar el mapa
    await Proyecto.updateMany({ mapas: id }, { $pull: { mapas: id } });    
    const mapa = await Mapa.findByIdAndDelete(id);
    res.status(201).json({
        msg:'Mapa borrado correctamente',
        mapa,
    });
 }

module.exports={
    mapaListar,
    mapaObtener,
    mapaCrear,
    mapaEditar,
    mapaBorrar
}
