const {response} = require('express');
const {Blog} = require('../models');

const blogListarTodos = async (req,res=response) =>{
    const blogs = await Blog.find();
    res.status(200).json(blogs);
}

const blogListarActivos = async (req,res=response) =>{
    const blog = await Blog.find({visible:true});
    res.status(200).json(blog);
}

const blogObtener = async (req,res=response) =>{
    const {id} = req.params;
    const blog = await Blog.findById(id);
    res.status(200).json({blog});
}

const blogCrear = async (req,res=response) =>{
    const data = {
        ...req.body,
        //titulo: req.body.titulo.toUpperCase(),        
    }
    const blog = new Blog(data);
    await blog.save();
    res.status(201).json({
        msg:'Blog guardado correctamente',
        blog
    });
}

const blogEditar = async (req,res=response) =>{
    const {id} = req.params;
    const data = req.body;
    //if(data.titulo){data.titulo = data.titulo.toUpperCase()};
    const blog = await Blog.findByIdAndUpdate(id,data, {new: true})
    res.status(201).json({
        msg:'Blog actualizado correctamente',
        blog,
    });
};

const blogDesactivar = async (req,res=response) =>{
    const {id} =req.params;
    const {visible} = await Blog.findById(id,'visible');//recogo el valor actual
    const blog = await Blog.findByIdAndUpdate(id,{visible:!visible}, {new: true});
    res.status(201).json({
        msg:'Blog activado/desactivado correctamente: ',
        blog
    });
 }

module.exports={
    blogListarTodos,
    blogListarActivos,
    blogObtener,
    blogCrear,
    blogEditar,
    blogDesactivar,
}