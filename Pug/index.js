const express = require('express')
const {engine} = require('express-handlebars')
const path = require('path');

const app = express()
const PORT = process.env.PORT || 8080

const {Productos} = require('./models/index');
const productos = new Productos();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}))

//Template engine
app.set('views', './views')
app.set('view engine', 'pug');

//Template render
app.get('/', (req, res) => {
    res.render('form')
})
app.get('/productos', (req, res) => {
    res.render('productos', {productos: productos.traerTodo()})
})
app.post('/productos', (req, res) => {
    productos.agregarProducto(req.body)
    res.redirect('/');
})

//Server
const servidorConectado = app.listen(PORT, () => {
    console.log(`El servidor esta andando en el puerto ${PORT}`);
})

servidorConectado.on('error', (error) => {
    console.error('Error: ', error);
})