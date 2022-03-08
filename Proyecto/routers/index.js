const express = require('express')
const productosRoutes = require('./productos.routes')
const carritoRoutes = require('./carrito.routes')
const router = express.Router();

//Middlewares
router.use(express.json());
router.use(express.urlencoded({extended: true}))

//Routes
router.use('/productos', productosRoutes);
router.use('carrito', carritoRoutes)

module.exports = router