const {Actividad,Mapa,Proyecto,Usuario} = require('../models');

const existeActividadId = async(id)=>{
    const existe = await Actividad.findById(id);
    if(!existe){
        throw new Error(`El id de actividad ${id} no existe`);
    }
}

const existeMapaId = async(id)=>{
    const existe = await Mapa.findById(id);
    if(!existe){
        throw new Error(`El id de mapa ${id} no existe`);
    }
}

const existeProyectoId = async(id)=>{
    const existe = await Proyecto.findById(id);
    if(!existe){
        throw new Error(`El id de proyecto ${id} no existe`);
    }
}

const existeUsuarioId = async(id)=>{
    const existe = await Usuario.findById(id);
    if(!existe){
        throw new Error(`El id de usuario ${id} no existe`);
    }
}

const validarMapasExisten = async (mapas) => {
    const mapasIds = mapas.map(mapaId => mapaId.trim()); // Limpia los IDs de posibles espacios en blanco
    const mapasExistentes = await Mapa.find({ _id: { $in: mapasIds } });

    if (mapasExistentes.length !== mapasIds.length) {
        throw new Error('Alguno de los IDs de mapa proporcionados no existe en la base de datos');
    }
};

module.exports={
    existeActividadId,
    existeMapaId,
    existeProyectoId,
    existeUsuarioId,
    validarMapasExisten
}

