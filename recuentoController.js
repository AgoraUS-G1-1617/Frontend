// Imports
const http = require('https'),
express = require('express'),
app = express(),
router = express.Router(),
recuentoHost='recuento.agoraus1.egc.duckdns.org', // recuento.agoraus1.egc.duckdns.org
recuentoPort=443 //443

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
  console.log(encuesta)
  console.log(encuesta!=null)
  if(encuesta!=null){       //if we are requesting a single poll to recuento
    console.log("HOLA")
      options = {
      host: recuentoHost,
      port: recuentoPort,
      //protocol: 'https:',
      path: '/api/recontarVotacion?idVotacion='+encuesta
  }
    peticion(options, res)
}else{//we are asking for all the polls, currently not available
  var json='[{"nombre":"encuesta 1","_id":"3","cp":"30000"},{"nombre":"encuesta 2","_id":"4","cp":"40000"}]'
  res.send(json)
}
  console.log(options.path)

})

// Visualizacion de estadísticas
router.get('/resultados/encuestas/votadas', function(req, res) {
  res.setHeader('Content-Type', 'application/json')

  const options = {
    host: recuentoHost,
    port: recuentoPort,
    path: '/api/resultados/encuestas/votadas'
  }
  //full json
json=[{"nombre":"encuesta 1","id":"3","cp":"30000",
      "estado":200,
            "preguntas":
            [{"id_pregunta":0,"titulo":"¿A quién va a votar en las próximas elecciones?",
                  "opciones":[
                              {"id_respuesta":0,"nombre":"Mariano Rajoy","votos":10},
                              {"id_respuesta":1,"nombre":"Pdro Snchz","votos":9},
                              {"id_respuesta":2,"nombre":"Pablo Iglesias","votos":8},
                              {"id_respuesta":3,"nombre":"Albert Rivera","votos":7}]},
              {"id_pregunta":1,"titulo":"¿Eres mayor de edad?",
                  "opciones":[{"id_respuesta":4,"nombre":"Sí","votos":40},
                              {"id_respuesta":5,"nombre":"No","votos":30}]}
            ]},
      {"nombre":"encuesta 2","id":"4","cp":"40000",
      "estado":200,
            "preguntas":
            [{"id_pregunta":0,"titulo":"¿A quién va a votar en las próximas elecciones?",
                  "opciones":[
                              {"id_respuesta":0,"nombre":"Mariano Rajoy","votos":10},
                              {"id_respuesta":1,"nombre":"Pdro Snchz","votos":9},
                              {"id_respuesta":2,"nombre":"Pablo Iglesias","votos":8},
                              {"id_respuesta":3,"nombre":"Albert Rivera","votos":7}]},
              {"id_pregunta":1,"titulo":"¿Eres mayor de edad?",
                  "opciones":[{"id_respuesta":4,"nombre":"Sí","votos":30},
                              {"id_respuesta":5,"nombre":"No","votos":10}]}
            ]}]

  res.json(json)
//  peticion(options, res)
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
  //json map, currently not available
  json='[{"code":"Málaga","z":"3"},{"code":"Sevilla","z":"8"},{"code":"Madrid","z":"1"}]'
  res.send(json)
//  peticion(options, res)
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
