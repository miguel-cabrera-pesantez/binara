const { response, json } = require('express');
const { subirArchivo } = require('../helpers/subirArchivo');
const path = require('path');
const fs = require('fs');


const cargarArchivo = async (req,res = response) =>{
    const{carpeta,id}= req.params;
    try {
        const nombre =  await subirArchivo(req.files,carpeta,id);
        res.json({
            nombre
        });
    } catch (msg) {
        res.status(400).json({msg:'error intentando guardar'})
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

module.exports = {
    cargarArchivo,
    mostrarImagen
}