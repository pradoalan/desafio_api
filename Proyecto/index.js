const express = require('express');
const apiRoutes = require('./routers/index');
const path = require('path')

const app = express();
const PORT = process.env.PORT || 8080

//Middlewares
app.use(express.static(path.resolve(__dirname, './public')));

//Routes
app.use('/api', apiRoutes)

//Server
const servidorConectado = app.listen(PORT, () => {
    console.log(`Servidor activo y andando en el puerto ${PORT}`);
})

servidorConectado.on('error', (error) => {
    console.error('Error: ', error);
})