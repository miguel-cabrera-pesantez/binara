const { response, json } = require("express");
const bcryptjs = require('bcryptjs');
const {Usuario} = require('../models');
const { generarJWT } = require("../helpers/generarJWT");
const { googleVerify } = require("../helpers/googleVerify");


const login = async(req,res = response) =>{

   const{correo,password} = req.body;
   
   try {

      const usuario = await Usuario.findOne({correo}); 

      if (!usuario){
         return res.status(400).json({msg:'Usuario / Password incorecto -corre mensaje sera borrado en produccion'})
      }
      if (!usuario.estado){
         return res.status(400).json({msg:'Usuario / Password incorecto -estado false mensaje sera borrado en produccion'})
      }

      const validPassword = bcryptjs.compareSync(password, usuario.password);

      if (!validPassword){
         return res.status(400).json({msg:'Usuario / Password incorecto -password mensaje sera borrado en produccion'})
      }

      //const token = await generarJWT(usuario.id,usuario.rol);
      const token = await generarJWT(usuario);

      res.json({
         msg:'Token generado correctamente',
         usuario,
         token
      });

   } catch (error) {
      console.log(error)
      return res.status(500).json({msg:'Error al autentificar'})
   }
}

 const  googleSingIn = async(req,res = response) =>{
   const {id_token} = req.body;

   try {
      const {nombre,correo} = await googleVerify(id_token);
      let usuario = await Usuario.findOne({correo});
      //si no existe
      if(!usuario){
         const data = {
            nombre,
            correo,
            password:'*Binara123.',
            google:true
         };
         usuario = new Usuario(data);
         await usuario.save();
      }

      // si el usuario DB esta en false por bloqueo , etc
      if(!usuario.estado){
         return res.status(401).json({
            msg:"Usuario desactivado, hable con el administrador"
         });
      }
      //Generar el jsonwebtoken
      const token = await generarJWT(usuario);
      res.json({
         msg:"ok",
         token,
         usuario
      });
   } catch (error) {
      res.status(400).json({
         ok:false,
         msg:'error al autentificar token de google'
      })
   }
 }

const renovarToken = async (req,res = response) => {

   const {usuario} = req;

   const token = await generarJWT(usuario.id);
   res.json({
      usuario,
      token,
   });
   
}

 module.exports = {
   login,
   googleSingIn,
   renovarToken
 }