const express=require('express')
const cors=require('cors');
const { dbConneccion } = require('../database/config');
const fileUpload = require('express-fileupload');
const { createServer} = require('http');

class Server{
    constructor(){
        this.app=express();
        this.server = createServer(this.app);
        this.paths={
            mapaPath : '/api/mapa',
            usuarioPath : '/api/usuario',
            proyectoPath : '/api/proyecto',
            actividadPath : '/api/actividad',
            loginPath : '/api/login',
            blogPath : '/api/blog',
            comentarioPath : '/api/comentario',
        };
        this.conectarDB();
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.app.use(express.static('public'));
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes(){
        this.app.use(this.paths.mapaPath,require('../routes/mapaRouter'));
        this.app.use(this.paths.usuarioPath,require('../routes/usuarioRouter'));
        this.app.use(this.paths.proyectoPath,require('../routes/proyectoRouter')); 
        this.app.use(this.paths.actividadPath,require('../routes/actividadRouter'));
        this.app.use(this.paths.loginPath,require('../routes/authRouter'));     
        this.app.use(this.paths.blogPath,require('../routes/blogRouter'));   
        this.app.use(this.paths.comentarioPath,require('../routes/comentarioRouter'));   
    }

    listen(){
        this.server.listen(process.env.PORT,()=> {
            console.log('Servidor en',process.env.PORT)
        });
    }

    async conectarDB(){
        await dbConneccion();
    }
}

module.exports = Server;