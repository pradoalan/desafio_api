const express = require('express')
const productRouter = express.Router()
const {Producto} = require('../models/productos')
const producto = new Producto();

const user = {
    authAdmin: true
};

//Middlewares
const authAdmin = (req, res, next) => {
    if(user.authAdmin){
        next();
    } else {
        res.status(403).json({error: -1, descripcion: `ruta ${req.originalUrl} método ${req.method} no autorizada`});  
    }
};

productRouter.get("/", async (req, res) => {
    try{
        const result = await producto.listarProductos();
        result === undefined
            ? res.send({error: "No hay productos cargados"})
            : res.send(result);
    }catch(error){
        res.send(error)
    }
})

productRouter.post("/", authAdmin, async (req, res) => {
    try{
        const {title, price, thumbnail, description, code} = await req.body;
        const result = await producto.agregarProducto(title, price, thumbnail, description, code);
        result !== undefined ? res.status(201).send(result) : res.send(null);
    }catch(error){
        res.send(error)
    }
})

productRouter.put('/:id', authAdmin, async (req, res) => {
    try{
        const {title, price, thumbnail, description, code} = await req.body;
        const id = await req.params.id;
        const payload = await producto.actualizarProducto(
            title,
            price,
            thumbnail,
            description,
            code,
            id
        );
        res.send(payload);
    }catch(error){
        res.send(error)
    }
})

productRouter.delete('/:id', authAdmin  , async (req, res) => {
    const id = await req.params.id;
    const payload = await producto.eliminarProducto(id)
    res.send(payload);
})

productRouter.get('/:id?', async (req, res) => {
    try{
        const id = req.params.id ?? "0";
        const result = await producto.mostrarProductos(id);
        result !== undefined
            ? res.send(result)
            : res.send({error: "Producto no encontrado"});
    }catch(error){
        res.send(error)
    }
})

module.exports = productRouter

