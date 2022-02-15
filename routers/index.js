const express = require('express');
const productosRoutes = require('./productos/productos.routes')

const router = express.Router();

//Middlewares
router.use(express.json());
router.use(express.urlencoded({extended: true}))

//Routes
router.use('/productos', productosRoutes);

module.exports = router