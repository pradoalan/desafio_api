const express = require('express')
const apiRoutes = require('./routers/index')

const app = express()
const PORT = process.env.PORT || 8080

//Middlewares
app.use(express.static('public'));

//Routes
app.use('/api', apiRoutes)

const servidorConectado = app.listen(PORT, () => {
    console.log(`El servidor esta andando en el puerto ${PORT}`);
})

servidorConectado.on('error', (error) => {
    console.error('Error: ', error);
})