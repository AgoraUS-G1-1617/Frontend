// Imports
const express = require('express'),
app = express(),
router = express.Router(),
port = 8080,
recuento = require('./recuentoController.js') //privadoController llama a nuestra base de datos (solo para pruebas),
//recuentoController llama a la api de recuento verdadera

// Public folders
app.use(express.static(__dirname + '/views'))
app.use(express.static(__dirname + '/src'))

app.use('/api', recuento) //se llama al controlador siempre que se recibe una petición a la API

// App's routes
router.get('/', function(req, res) {
    res.sendFile('index.html')
})
router.get('/*', function(req, res) {
    res.sendFile(__dirname+'/views/index.html')
})
app.use(router)


// Starting node server
app.listen(port, () => {
    console.log("Magic happens on port " + port)
})

// Make node.js not exit on error
process.on('uncaughtException', function (err) {
  console.log('Caught exception: ' + err);
});

setTimeout(function () {
  console.log('This will still run.');
}, 500);
