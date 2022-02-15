const express = require('express')

const productos = require('../../data/data')

const router = express.Router();

router.get('/', (req, res) => {
    return res.json(productos)
})

router.get('/:productoId', (req, res) => {
    const {productoId} = req.params;
    const producto = productos.find(producto => producto.id === +productoId)
    if(!producto){
        return res.status(404).json({error: `Producto no encontrado`})
    }
    return res.json(producto)
})

router.post('/', (req, res) =>{
    const {title, price, thumbnail} = req.body;
    if(!title || !price || !thumbnail){
        return res.status(400).json({error: `Datos ingresados erroneamente`})
    }
    const newProducto = {
        id:productos.length +1,
        title,
        price,
        thumbnail
    }
    productos.push(newProducto)
    return res.json(newProducto)
})

router.put('/:productoId', (req, res) => {
    const {params: {productoId}, body: {title, price, thumbnail} } = req
    if(!title || !price || !thumbnail){
        return res.status(400).json({error: `Datos ingresados erroneamente`})
    }
    const productoIndex = productos.findIndex((producto) => producto.id === +productoId)
    if(productoIndex < 0){
        return res.status(400).json({error: `El Id ${productoId} no existe`})
    }
    const newProducto = {
        ...productos[productoIndex],
        title,
        price,
        thumbnail
    }
    productos[productoIndex] = newProducto
    return res.json(newProducto)
})

router.delete('/:productoId', (req, res) => {
    const {productoId} = req.params;
    const productoIndex = productos.findIndex((producto) => producto.id === +productoId )
    if(productoIndex < 0){
        return res.status(404).json({error: `Producto no encontrado`})
    }
    productos.splice(productoIndex, 1);
    return res.json({results: `Producto eliminado correctamente`})

})

module.exports = router