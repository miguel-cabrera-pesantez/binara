const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.CORREO_NOTIFICACION,
      pass: process.env.CLAVE_CORREO_NOTIFICACION,
    }
  });
    
const correoEnviar = async (req,res=response) =>{
    const {nombre,correo,telefono,asunto,comentario} = req.body;
    console.log("🚀 ~ file: mailSendController.js:15 ~ correoEnviar ~ nombre,correo,telefono,asunto,comentario:", nombre,correo,telefono,asunto,comentario)
    try {
        await transporter.sendMail({
            from: `Binara Notificacion <${process.env.CORREO_NOTIFICACION}>`, 
            to: process.env.CORREO_RECIBE_NOTIFICACION, // list of receivers
            subject: asunto, // Subject line
            //text: "Hello world?", // plain text body
            html: `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Persona Intersada</title>
            </head>
            <body>
                <h1>Datos de la persona interesada</h1>
                <ul>
                    <li><strong>Nombre:</strong> ${nombre}</li>
                    <li><strong>Correo Electrónico:</strong> ${correo}</li>
                    <li><strong>Teléfono:</strong> ${telefono}</li>
                    <li><strong>Asunto:</strong> ${asunto}</li>
                    <li><strong>Comentario:</strong> ${comentario}</li>
                </ul>
            </body>
            </html>
            `,
            });
            res.status(200).json({
            msg:'Correo enviado exitosamente',
            comentario
        });
    } catch (error) {
        res.status(400).json({
            msg:'Error al enviar el correo',  
            error              
        });
    }
}    

module.exports={
    correoEnviar,
}    
  