const path = require('path');

const subirArchivo = (files,carpeta ='',id,extencionesValidas=['png','jpg','jpeg','gif']) => {
    
    return new Promise((resolve,reject)=>{
        const {archivo} = files;
        const nombreCortado = archivo.name.split('.');
        const extension=nombreCortado[nombreCortado.length-1];
    //validar extencion

        if (!extencionesValidas.includes(extension)){
            return reject(`La extension ${extension} no es perminditda, solo ${extencionesValidas}`);            
        }
        const nombreTmp = id + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTmp);

        archivo.mv(uploadPath, (err) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            resolve(nombreTmp)
            //res.json({msg:'File uploaded to ' + uploadPath});
        });
    })
    
}

module.exports = {
    subirArchivo
}