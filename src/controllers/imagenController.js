const { response, json } = require('express');
const { subirArchivo } = require('../helpers/subirArchivo');
const path = require('path');
const fs = require('fs');
const { Blog, Parametro, Proyecto } = require('../models');


const cargarArchivo = async (req,res = response) =>{
    const{carpeta,id}= req.params;
    let modelo;
    switch (carpeta) {
        case 'blog':
            modelo = await Blog.finfindByIdAndUpdate(id);
            if (!modelo){
                return res.status(400).json({
                    msg:`el blog con ese id : ${id} no existe`
                });
            }                  
        break;

        case 'parametro':
            modelo = await Parametro.findById(id);
            if (!modelo){
                return res.status(400).json({
                    msg:`no existe un parametro con ese id : ${id}`
                });
            }                  
        break;

        case 'proyecto':
            modelo = await Proyecto.findById(id);
            if (!modelo){
                return res.status(400).json({
                    msg:`no existe un proyecto con ese id : ${id}`
                });
            }                  
        break;
    
        default:
            res.status(500),json({
                msg:'error al cargar la imagen, imagenController:41',
            });
    }

    
    if (modelo.portada || modelo.foto || modelo.imagen){
        
        const imagenes = [modelo.portada, modelo.foto, modelo.imagen];

        imagenes.forEach(imagen => {
            if (imagen) {
                const pathImagen = path.join(__dirname, '../uploads', carpeta, imagen);
                if (fs.existsSync(pathImagen)) {
                    fs.unlinkSync(pathImagen);
                }
            }
        });
    }

    try {        
        const nombre =  await subirArchivo(req.files,carpeta,id);
        carpeta=='blog'
        ? modelo.foto = nombre
        : carpeta=='parametro'
            ? modelo.imagen = nombre
            : modelo.portada = nombre;
        modelo.save();
        res.json({
            msg:'Registro con foto actualizado',
            nombre
        });
    } catch (msg) {
        res.status(400).json({msg:'error intentando guardar o eliminar anterior'})
    };  

};

const mostrarImagen = async (req,res = response) => {
    const {imagen,carpeta} = req.params;

    const pathImagen = path.join(__dirname,'../uploads',carpeta,imagen)
        if(fs.existsSync(pathImagen)){
            return res.sendFile(pathImagen);            
        };   
    res.sendFile(path.join(__dirname,'../uploads/noImage.gif'));
}

const borrarImagen = async (req,res = response) => {
    const{carpeta,id}= req.params;
    let modelo;
    switch (carpeta) {
        case 'blog':
            modelo = await Blog.finfindByIdAndUpdate(id);
            if (!modelo){
                return res.status(400).json({
                    msg:`el blog con ese id : ${id} no existe`
                });
            }                  
        break;

        case 'parametro':
            modelo = await Parametro.findById(id);
            if (!modelo){
                return res.status(400).json({
                    msg:`no existe un parametro con ese id : ${id}`
                });
            }                  
        break;

        case 'proyecto':
            modelo = await Proyecto.findById(id);
            if (!modelo){
                return res.status(400).json({
                    msg:`no existe un proyecto con ese id : ${id}`
                });
            }                  
        break;
    
        default:
            res.status(500),json({
                msg:'error al cargar la imagen, imagenController:41',
            });
    }

    if (modelo.portada || modelo.foto || modelo.imagen){
        console.log('true');
        const imagenes = [modelo.portada, modelo.foto, modelo.imagen];

        imagenes.forEach(imagen => {
            if (imagen) {
                const pathImagen = path.join(__dirname, '../uploads', carpeta, imagen);
                if (fs.existsSync(pathImagen)) {
                    fs.unlinkSync(pathImagen);
                    carpeta=='blog'
                    ? modelo.foto = ''
                    : carpeta=='parametro'
                        ? modelo.imagen = ''
                        : modelo.portada = '';
                    modelo.save();
                    res.json({
                        msg:`Imagen borrada en ${carpeta} del registro ${id}`,
                        modelo
                    });
                }
            }
        });
    }else{
        console.log('else');
        res.json({
            msg:`No existe ninguna imagen a borrar en ${carpeta} del registro ${id}`
        });
    }
}

module.exports = {
    cargarArchivo,
    mostrarImagen,
    borrarImagen,
}