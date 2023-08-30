const jwt = require('jsonwebtoken');

const generarJWT =(usuario='') =>{
    return new Promise( (resolve,reject) =>{
        const payload = {usuario};
        jwt.sign(payload,process.env.SECRETORPRIVATEKEY,{
            expiresIn:'4h'
        },(err,token) =>{
            if (err){
                console.log(err);
                reject('No se pudo generar el tokencio')
            }else{
                resolve(token);
            }
        })
    })
}

module.exports={
    generarJWT,
}