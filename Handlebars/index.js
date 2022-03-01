const express = require('express')

const { Server: HttpServer } = require('http')
const { Server: Socket } = require('socket.io')

const ContenedorProductos = require('./models/contenedorProductos')
const ContenedorMensajes = require('./models/contenedorMensajes')

const app = express()
const httpServer = new HttpServer(app)
const io = new Socket(httpServer)

const productosApi = new ContenedorProductos()
const mensajesApi = new ContenedorMensajes('mensajes.json')

//Socket
io.on('connection', async socket => {
    console.log('Nuevo cliente conectado!');

    socket.emit('productos', productosApi.listarAll());

    socket.on('update', producto => {
        productosApi.guardar(producto)
        io.sockets.emit('productos', productosApi.listarAll());
    })

    socket.emit('mensajes', await mensajesApi.listarAll());

    socket.on('nuevoMensaje', async mensaje => {
        mensaje.fyh = new Date().toLocaleString()
        await mensajesApi.guardar(mensaje)
        io.sockets.emit('mensajes', await mensajesApi.listarAll());
    })
});

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

//Server listen
const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))