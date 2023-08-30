const {response,request} = require('express');
const jwt = require('jsonwebtoken');
const {Usuario} = require('../models');

const validarJWT = async(req,res=response,next) =>{
    
    const token = req.header('x-token');//nombre del header
    if(!token){
        return res.status(401).json({
            msg:"No se encuentra el token"
        });
    }

    try {

        const {uid} = jwt.verify(token,process.env.SECRETORPRIVATEKEY);

        const usuario = await Usuario.findById(uid);

        if(!usuario){
            return res.status(401).json({
                msg:"Token no valido - usuario no valido - especificacion se borrara en produccion"
            })
        }

        if(!usuario.estado){
            return res.status(401).json({
                msg:"Token no valido - estado false usuario - especificacion se borrara en produccion"
            })
        }

        req.usuario = usuario;

        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg:"Token no autorizado"
        })
    }
}

module.exports ={
    validarJWT
};