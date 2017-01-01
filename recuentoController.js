//Controlador en el que se realizan las llamadas a la API de recuento para funcionamiento
//de nuestra propia API y de la parte de cliente
// Imports
const http = require('https'),
express = require('express'),
app = express(),
router = express.Router(),
//estamos usando la versión beta para pruebas
beta=true,
recuentoHost=beta?'beta.recuento.agoraus1.egc.duckdns.org':'recuento.agoraus1.egc.duckdns.org', // recuento.agoraus1.egc.duckdns.org
recuentoPort=443; // Puerto HTTPS utilizado para las llamadas a la API de recuento


//petición a usar cuando solo queremos un objeto. normalmente se recibe un json {estado:200,objeto:{}}, asi que solo cogemos el objeto
peticion = (options, res,objectName) => {
  http.request(options, (response) => {
    var json = ''

    //Los datos son recibidos en forma de chunks, los cuales se van almacenando en la variable json
    response.on('data', (chunk) => {
      json += chunk
    })

    response.on('end', function () {
      console.log(objectName)
      resultados=JSON.parse(json)[objectName]
      console.log(resultados);
    if(objectName=="votacion"){
        options.path='/api/recontarVotacion?idVotacion='+resultados.id_votacion
        combinar(options, res,'preguntas',resultados);
    }else{
      res.send(resultados);
    }//Enviamos el json al cliente
    })
  }).end()
}
combinar=(options, res,objectName,votacion)=>{
  http.request(options, (response) => {
    var json = ''

    //Los datos son recibidos en forma de chunks, los cuales se van almacenando en la variable json
    response.on('data', (chunk) => {
      json += chunk
    })

    response.on('end', function () {
      console.log(objectName)
      aux=JSON.parse(json)
      if(aux["estado"]==200){
      resultados=aux[objectName]
      console.log(resultados);
      //hay que comprobar manualmente todas las preguntas y opciones y devolverlas
      for (var i=0;i<votacion["preguntas"].length;i++){
        var preg=votacion["preguntas"][i];
        for (var j=0;j<resultados.length;j++){
          if (preg.id_pregunta==resultados[j].id_pregunta){
            for(var k=0;k<preg["opciones"].length;k++){
              for(var l=0;l<resultados[j]["opciones"].length;l++){
                if(preg["opciones"][k].id_opcion==resultados[j]["opciones"][l].id_opcion){
                  //aquí combinamos los json añadiendo el recuento de uno a otro diccionario
                  preg["opciones"][k]["votos"]=resultados[j]["opciones"][l].votos
                }
              }
            }
          }
        }
      }
}
      res.send(votacion);
    })
  }).end()

}
//Petición personalizada para el mapa
peticionMapa = (options, res) => {
  http.request(options, (response) => {
    var json = ''

    //Los datos son recibidos en forma de chunks, los cuales se van almacenando en la variable json
    response.on('data', (chunk) => {
      json += chunk
    })

    response.on('end', function () {
      resultados=JSON.parse(json)["votaciones"]
      console.log(resultados);
      resultados=encuestasToMapa(resultados);
      console.log(resultados);
      res.send(resultados) //Enviamos el json al cliente

    })
  }).end()
}
//Definición de rutas, a las cuales se llama para acceder a la API

// Visualizacion de resultados
router.get('/resultados/encuestas', function(req, res) {
  res.setHeader('Content-Type', 'application/json')
  var encuesta=req.query.encuesta
//Utilizamos las variables utilizadas arriba, para cambiarlas con una mayor facilidad
  var options = {
    host: recuentoHost,
    port: recuentoPort,
    path: '/api/verVotaciones?detallado=si'
  }
  console.log(encuesta)
  if(encuesta!=null){       //Si solicitamos una sola encuesta
      options = {
      host: recuentoHost,
      port: recuentoPort,
      //protocol: 'https:',
      path: '/api/verVotacion?detallado=si&idVotacion='+encuesta
    };
  peticion(options, res,'votacion');

  }
//Si pedimos por todas las votaciones
else{
  // var json='[{"titulo":"encuesta 1","_id":"3","cp":"30000"},{"titulo":"encuesta 2","_id":"4","cp":"40000"}]'
  //res.send(json)
  peticion(options, res,'votaciones');

}
 console.log(options.path);
})
peticionCombinado = (options, res,objectName) => {
  http.request(options, (response) => {
    var json = ''

    //Los datos son recibidos en forma de chunks, los cuales se van almacenando en la variable json
    response.on('data', (chunk) => {
      json += chunk
    })

    response.on('end', function () {
      console.log(objectName)
      resultados=JSON.parse(json)[objectName]
      console.log(resultados);
      if (resultados.length>0){
      options.path='/api/recontarVotacion?idVotacion='+resultados[0].id_votacion
      combinarEstadisticas(options, res,'preguntas',resultados,0);
    }else{
      res.send([]);
    }

    })
  }).end()
}
combinarEstadisticas=(options, res,objectName,votaciones,indice)=>{
  http.request(options, (response) => {
    var json = ''

    //Los datos son recibidos en forma de chunks, los cuales se van almacenando en la variable json
    response.on('data', (chunk) => {
      json += chunk
    })

    response.on('end', function () {
      console.log(objectName)
      aux=JSON.parse(json)
      console.log(aux["estado"])
      if(aux["estado"]==200){
        resultados=aux[objectName]
        console.log(resultados);
        votaciones[indice]["preguntas"]=resultados;
      }else{
          votaciones[indice]["preguntas"]==[]
      }
      //si es la última, cogemos las votaciones válidas(codigo 200) y las enviamos
      if(indice+1==votaciones.length){
        enviar=[]
        for (var i=0;i<votaciones.length;i++){
          if (votaciones[i]["preguntas"]!=null){
            enviar.push(votaciones[i])
          }
        }
        res.send(enviar)
      }else{
    //en caso contrario, pedimos la siguiente votacion
        options.path='/api/recontarVotacion?idVotacion='+resultados[indice+1].id_votacion
      combinarEstadisticas(options,res,objectName,votaciones,indice+1);
      }

      })
  }).end()
}
// Visualizacion de estadísticas
router.get('/resultados/encuestas/votadas', function(req, res) {
  res.setHeader('Content-Type', 'application/json')

  var options = {
    host: recuentoHost,
    port: recuentoPort,
    path: '/api/verVotaciones'
  }
  peticionCombinado(options, res,'votaciones');
  //full json
// json=[{"titulo":"encuesta 1","id_votacion":"3","cp":"30000",
//             "preguntas":
//             [{"id_pregunta":0,"texto_pregunta":"¿A quién va a votar en las próximas elecciones?",
//                   "opciones":[
//                               {"id_opcion":0,"texto_opcion":"Mariano Rajoy","votos":10},
//                               {"id_opcion":1,"texto_opcion":"Pdro Snchz","votos":9},
//                               {"id_opcion":2,"texto_opcion":"Pablo Iglesias","votos":8},
//                               {"id_opcion":3,"texto_opcion":"Albert Rivera","votos":7}]},
//               {"id_pregunta":1,"texto_pregunta":"¿Eres mayor de edad?",
//                   "opciones":[{"id_opcion":4,"texto_opcion":"Sí","votos":40},
//                               {"id_opcion":5,"texto_opcion":"No","votos":30}]}
//             ]},
//       {"titulo":"encuesta 2","id_votacion":"4","cp":"40000",
//             "preguntas":
//             [{"id_pregunta":0,"texto_pregunta":"¿A quién va a votar en las próximas elecciones?",
//                   "opciones":[
//                               {"id_opcion":0,"texto_opcion":"Mariano Rajoy","votos":10},
//                               {"id_opcion":1,"texto_opcion":"Pdro Snchz","votos":9},
//                               {"id_opcion":2,"texto_opcion":"Pablo Iglesias","votos":8},
//                               {"id_opcion":3,"texto_opcion":"Albert Rivera","votos":7}]},
//               {"id_pregunta":1,"texto_pregunta":"¿Eres mayor de edad?",
//                   "opciones":[{"id_opcion":4,"texto_opcion":"Sí","votos":30},
//                               {"id_opcion":5,"texto_opcion":"No","votos":10}]}
//             ]}]
//   res.json(json)

//  peticion(options, res)
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

router.get('/resultados/mapa', function(req, res) {
  res.setHeader('Content-Type', 'application/json')

  const options = {
    host: recuentoHost,
    port: recuentoPort,
    path: '/api/verVotaciones?detallado=si'
  }
  //json map, currently not available
  //json='[{"code":"Málaga","z":"3"},{"code":"Sevilla","z":"8"},{"code":"Madrid","z":"1"}]'
  //res.send(json)
   peticionMapa(options, res)
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

//Recoge las encuestas y cuenta el número de encuestas por provincia
function encuestasToMapa(encuestas){
  mapa=[]
  for (var index in encuestas) {
    cp=Math.floor(encuestas[index].cp/1000);
    if(cp<1||cp>52)continue;
    prov="";
    console.log(cp);
    //Ojo al nombre de las provincias, tienen que ser exactamente las ofrecidas por GeoJson, incluidas los acentos
    //Si alguno no coincide con el nombre que sale en el mapa, las encuestas de esa provincia no se mostrarán
    if(cp==(1)){
prov="Álava";
}else if(cp==(2)){
prov="Albacete";
}else if(cp==(3)){
prov="Alicante";
}else if(cp==(4)){
prov="Almería";
}else if(cp==(5)){
prov="Ávila";
}else if(cp==(6)){
prov="Badajoz";
}else if(cp==(7)){
prov="Baleares";
}else if(cp==(8)){
prov="Barcelona";
}else if(cp==(9)){
prov="Burgos";
}else if(cp==(10)){
prov="Cáceres";
}else if(cp==(11)){
prov="Cádiz";
}else if(cp==(12)){
prov="Castellón";
}else if(cp==(13)){
prov="Ciudad Real";
}else if(cp==(14)){
prov="Córdoba";
}else if(cp==(15)){
prov="A Coruña";
}else if(cp==(16)){
prov="Cuenca";
}else if(cp==(17)){
prov="Gerona";
}else if(cp==(18)){
prov="Granada";
}else if(cp==(19)){
prov="Guadalajara";
}else if(cp==(20)){
prov="Gipuzkoa";
}else if(cp==(21)){
prov="Huelva";
}else if(cp==(22)){
prov="Huesca";
}else if(cp==(23)){
prov="Jaén";
}else if(cp==(24)){
prov="León";
}else if(cp==(25)){
prov="Lérida";
}else if(cp==(26)){
prov="La Rioja";
}else if(cp==(27)){
prov="Lugo";
}else if(cp==(28)){
prov="Madrid";
}else if(cp==(29)){
prov="Málaga";
}else if(cp==(30)){
prov="Murcia";
}else if(cp==(31)){
prov="Navarra";
}else if(cp==(32)){
prov="Orense";
}else if(cp==(33)){
prov="Asturias";
}else if(cp==(34)){
prov="Palencia";
}else if(cp==(35)){
prov="Las Palmas";
}else if(cp==(36)){
prov="Pontevedra";
}else if(cp==(37)){
prov="Salamanca";
}else if(cp==(38)){
prov="Tenerife";
}else if(cp==(39)){
prov="Cantabria";
}else if(cp==(40)){
prov="Segovia";
}else if(cp==(41)){
prov="Sevilla";
}else if(cp==(42)){
prov="Soria";
}else if(cp==(43)){
prov="Tarragona";
}else if(cp==(44)){
prov="Teruel";
}else if(cp==(45)){
prov="Toledo";
}else if(cp==(46)){
prov="Valencia";
}else if(cp==(47)){
prov="Valladolid";
}else if(cp==(48)){
prov="Vizcaya";
}else if(cp==(49)){
prov="Zamora";
}else if(cp==(50)){
prov="Zaragoza";
}else if(cp==(51)){
prov="Ceuta";
}else if(cp==(52)){
prov="Melilla";
  }
  if( mapa[cp-1]==null)
   mapa[cp-1]={code:prov,z:1};
  else {
    mapa[cp-1].z=mapa[cp-1].z+1;
  }
}
mapares=[]
var index=0
for (i=0;i<mapa.length;i++)
  if(mapa[i]!=null)
  {
    mapares[index++]=mapa[i];
  }
return mapares;
}

module.exports = router
