const express = require('express')
const cartRouter = express.Router()
const {Carrito} = require('../models/carrito')

const carrito = new Carrito();

cartRouter.get("/:id?"), async (req, res) => {
    try{
        const id = req.params.id ?? "0";
        const result = await carrito.mostrarCarrito(id);

        result != undefined
            ? res.send(result)
            : res.send({error: "Cart no encontrado"});
    }catch(error){
        res.send(error)
    }
}

cartRouter.post("/"), async (req, res) => {
    try{
        new NuevoCarrito = {
            timestamp: Date.now(),
            productos: []
        }
        const result = await carrito.agregarCarrito(NuevoCarrito)
		result !== undefined ? res.status(201).send(result) : res.send(null);
	}catch (error) {
		res.send(error);
	}
}

cartRouter.post('/:id/productos', async (req, res) => {
    const { params: { id }, body: { prodId } } = req;
    try{
        const result = await carrito.agregarProductoCarrito(+id, +prodId)
		result !== undefined ? res.status(201).send(result) : res.send(null);
    }catch(error){
        res.send(error)
    }
})

cartRouter.delete("/:id", (req, res) => {
    const id = req.params.id;
    res.send(producto.eliminarProducto(id))
});

module.exports = cartRouter