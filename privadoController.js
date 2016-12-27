//Controlador en el que se realizan las llamadas a la base de datos de recuento propia
//utilizada para pruebas
// Imports
const http = require('http'),
express = require('express'),
app = express(),
router = express.Router(),
//de momento la API interna no es compatible con los ficheros ya que los atributos de la db no coinciden con los de la API externa
recuentoHost='localhost',
recuentoPort=3000

peticion = (options, res) => {
  http.request(options, (response) => {
    var json = ''

    //Los datos son recibidos en forma de chunks, los cuales se van almacenando en la variable json
    response.on('data', (chunk) => {
      json += chunk
    })

    response.on('end', function () {
console.log(options.path);
      console.log(json);
      res.send(json) //Enviamos el json al cliente
    })
  }).end()
}
//Definición de rutas, a las cuales se llama para acceder a la API

// Visualizacion de resultados
router.get('/resultados/encuestas', function(req, res) {
  res.setHeader('Content-Type', 'application/json')
  var encuesta=req.query.encuesta

  var options = {
    host: recuentoHost,
    port: recuentoPort,
    path: '/api/resultados/encuestas'
  }
  if(encuesta!=null){       //Si solicitamos una sola encuesta
    options = {
      host: recuentoHost,
      port: recuentoPort,
      path: '/api/resultados/encuestas?encuesta='+encuesta
  }
}
  peticion(options, res)
})

// Visualizacion de estadísticas
router.get('/resultados/encuestas/votadas', function(req, res) {
  res.setHeader('Content-Type', 'application/json')

  const options = {
    host: recuentoHost,
    port: recuentoPort,
    path: '/api/resultados/encuestas/votadas'
  }
  peticion(options, res)
})
//Recibimos las preguntas de una encuesta
router.get('/resultados/preguntas', function(req, res) {
  res.setHeader('Content-Type', 'application/json')
  var encuesta=req.query.encuesta

  const options = {
    host: recuentoHost,
    port: recuentoPort,
    path: '/api/resultados/preguntas?encuesta='+encuesta
  }
  peticion(options, res)
})
//Recibimos los datos del mapa de la API
router.get('/resultados/mapa', function(req, res) {
  res.setHeader('Content-Type', 'application/json')

  const options = {
    host: recuentoHost,
    port: recuentoPort,
    path: '/api/resultados/mapa'
  }
  peticion(options, res)
})

router.get('/resultados/opciones/:pregunta', function(req, res) {
  res.setHeader('Content-Type', 'application/json')
  var pregunta=req.params.pregunta

  const options = {
    host: recuentoHost,
    port: recuentoPort,
    path: '/api/resultados/opciones/'+pregunta
  }
  peticion(options, res)
})


module.exports = router
