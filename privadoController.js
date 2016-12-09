// Imports
const http = require('http'),
express = require('express'),
app = express(),
router = express.Router(),
recuentoHost='localhost',
recuentoPort=3000

peticion = (options, res) => {
  http.request(options, (response) => {
    var json = ''

    //Data is received as chunks, so we add each chunk to the var json
    response.on('data', (chunk) => {
      json += chunk
    })

    response.on('end', function () {
      res.send(json) //server sends json to client
    })
  }).end()
}
//routes definition

// Visualizacion de resultados
router.get('/resultados/encuestas', function(req, res) {
  res.setHeader('Content-Type', 'application/json')
  var encuesta=req.query.encuesta

  var options = {
    host: recuentoHost,
    port: recuentoPort,
    path: '/api/resultados/encuestas'
  }
  if(encuesta!=null){       //if we are requesting a single poll
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
