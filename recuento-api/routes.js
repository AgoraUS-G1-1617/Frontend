// Imports
const routes = require('express').Router()
const mongoose = require('mongoose')
const Encuesta = require('./models').Encuesta
const Pregunta = require('./models').Pregunta
const Opcion = require('./models').Opcion


routes.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected!' })
})

routes.get('/encuestas', (req, res) => {
    var filter = {}
    if (req.query.encuesta !== undefined) {
        filter={id_votacion:req.query.encuesta}
        Encuesta.findOne( filter , (err, encuestas) => {
            if (err) res.status(404).json(err)
            var respuesta=encuestas.toObject()
            filter = { encuesta:respuesta._id  }
            Pregunta.find(filter,function(err, preguntas) {
                if (err) res.status(404).json(err)

                var arr=[]
                console.log(preguntas.length)
                var index=0
                for(var i=0;i<preguntas.length;i++){
                  var preg=preguntas[i];
                  Opcion.find({pregunta:preg._id},(err, opciones) => {
                      if (err) res.status(404).json(err)
                      arr[index]=preguntas[index].toObject()
                      arr[index]["opciones"]=opciones
                      console.log(arr.length)
                      console.log(index)
                      index++
                      if(preguntas.length==arr.length){
                      respuesta["preguntas"]=arr
                      console.log(respuesta)
                      res.status(200).json(respuesta)
                    }

                  })

                }
            })

            })

    }    else{
    Encuesta.find( filter , (err, encuestas) => {
        if (err) res.status(404).json(err)
        res.status(200).json(encuestas)
    })
  }

})

routes.get('/preguntas', (req, res) => {
  if(req.query.encuesta==null){
    Pregunta.find(function(err, preguntas) {
        if (err) res.status(404).json(err)
        res.status(200).json(preguntas)
    })
  }else{
    Pregunta.find({encuesta: req.query.encuesta},function(err, preguntas) {
        if (err) res.status(404).json(err)
        res.status(200).json(preguntas)
    })
  }

})

routes.get('/opciones/:pregunta', (req, res) => {
    Opcion.find({pregunta: req.params.pregunta}, function(err, preguntas) {
        if (err) res.status(404).json(err)
        res.status(200).json(preguntas)
    })

})

routes.get('/mapa', (req, res) => {

    Encuesta.find(function(err, encuestas) {
        if (err) res.status(404).json(err)
        mapa=[]
        for (var index in encuestas) {
          cp=Math.floor(encuestas[index].cp/1000);
          if(cp<1||cp>52)continue;
          prov="";
          console.log(cp);
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
        res.status(200).json(mapares)
    })

})

routes.get('/encuestas/votadas', (req, res) => {
  var filter = {}

      filter={id_votacion:1}
      Encuesta.findOne( filter , (err, encuestas) => {
          if (err) res.status(404).json(err)
          var respuesta=encuestas.toObject()
          filter = { encuesta:respuesta._id  }
          Pregunta.find(filter,function(err, preguntas) {
              if (err) res.status(404).json(err)

              var arr=[]
              console.log(preguntas.length)
              var index=0
              for(var i=0;i<preguntas.length;i++){
                var preg=preguntas[i];
                Opcion.find({pregunta:preg._id},(err, opciones) => {
                    if (err) res.status(404).json(err)
                    arr[index]=preguntas[index].toObject()
                    arr[index]["opciones"]=opciones
                    console.log(arr.length)
                    console.log(index)
                    index++
                    if(preguntas.length==arr.length){
                    respuesta["preguntas"]=arr
                    console.log(respuesta)
                    res.status(200).json([respuesta])
                  }

                })

              }
          })

          })


})
module.exports = routes
