// Imports
const mongoose = require('mongoose')
const db = mongoose.connection
const Encuesta = require('./models').Encuesta
const Pregunta = require('./models').Pregunta
const Opcion = require('./models').Opcion
mongoose.Promise = global.Promise

// Conección a mLab, un hosting gratis de mongo en la nube
mongoose.connect('mongodb://barrelito:patterson@ds035333.mlab.com:35333/hennessy')

// Logging cuando haya error y cuando se conecte
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', callback => {
	console.log("Database opened successfully")
})

// Vaciado de tablas para repopular
Opcion.collection.remove()
Pregunta.collection.remove()
Encuesta.collection.remove()

// Datos a persistir
// Encuestas
let encuesta1 = new Encuesta({   cp: 41013, nombre: "Encuesta 1" }),
    encuesta2 = new Encuesta({   cp: 41012, nombre: "Encuesta 2" }),
    encuesta3 = new Encuesta({   cp: 28052,nombre: "Encuesta 3" })

// Preguntas
let pregunta1 = new Pregunta({

        titulo: '¿Quién debe de ser el presidente de la comunidad?',
        encuesta: encuesta1._id
    }),
    pregunta2 = new Pregunta({

        titulo: '¿Consideras las cuentas de este año correctas?',
        encuesta: encuesta1._id
    }),
    pregunta3 = new Pregunta({

        titulo: '¿En general, estás satisfecho con el antiguo presidente?',
        encuesta: encuesta1._id
    })

let pregunta4 = new Pregunta({

        titulo: '¿Cual es el mejor juego de nuestra tienda?',
        encuesta: encuesta2._id
    }),
    pregunta5 = new Pregunta({

        titulo: '¿Qué le parece nuestra politica de precios?',
        encuesta: encuesta2._id
    }),
    pregunta6 = new Pregunta({

        titulo: '¿En general, como calificarias nuestra tienda?',
        encuesta: encuesta2._id
    })

let pregunta7 = new Pregunta({

        titulo: '¿Quien debería de ganar las elecciones?',
        encuesta: encuesta3._id
    })

// Opciones
let opcion1 = new Opcion({
        votos: 10,
        nombre: 'Manuel',
        pregunta: pregunta1._id
    }),
    opcion2 = new Opcion({
        votos: 3,
        nombre: 'Juan',
        pregunta: pregunta1._id
    }),
    opcion3 = new Opcion({
        votos: 0,
        nombre: 'Antonio',
        pregunta: pregunta1._id
    })

let opcion4 = new Opcion({
        votos: 20,
        nombre: 'Sí',
        pregunta: pregunta2._id
    }),
    opcion5 = new Opcion({
        votos: 1,
        nombre: 'No',
        pregunta: pregunta2._id
    })

let opcion6 = new Opcion({
        votos: 19,
        nombre: 'Sí',
        pregunta: pregunta3._id
    }),
    opcion7 = new Opcion({
        votos: 1,
        nombre: 'No',
        pregunta: pregunta3._id
    }),
    opcion8 = new Opcion({
        votos: 3,
        nombre: 'NS/NC',
        pregunta: pregunta3._id
    })

let opcion9 = new Opcion({
        votos: 40,
        nombre: 'Fifa 2016',
        pregunta: pregunta4._id
    }),
    opcion10 = new Opcion({
        votos: 2,
        nombre: 'Pro Evolution 2016',
        pregunta: pregunta4._id
    }),
    opcion11 = new Opcion({
        votos: 77,
        nombre: 'World Of Warcraft',
        pregunta: pregunta4._id
    }),
    opcion12 = new Opcion({
        votos: 100,
        nombre: 'Call Of Duty',
        pregunta: pregunta4._id
    }),
    opcion13 = new Opcion({
        votos: 1000,
        nombre: 'Bien, precio correcto',
        pregunta: pregunta5._id
    }),
    opcion14 = new Opcion({
        votos: 10,
        nombre: 'Mal, en otras tiendas estan mas baratos',
        pregunta: pregunta5._id
    })

let opcion15 = new Opcion({
        votos: 100,
        nombre: 'Muy caros',
        pregunta: pregunta5._id
    })

let opcion16 = new Opcion({
        votos: 2,
        nombre: '0',
        pregunta: pregunta6._id
    }),
    opcion17 = new Opcion({
        votos: 5,
        nombre: '1',
        pregunta: pregunta6._id
    }),
    opcion18 = new Opcion({
        votos: 2,
        nombre: '2',
        pregunta: pregunta6._id
    }),
    opcion19 = new Opcion({
        votos: 8,
        nombre: '3',
        pregunta: pregunta6._id
    }),
    opcion20 = new Opcion({
        votos: 2,
        nombre: '4',
        pregunta: pregunta6._id
    }),
    opcion21 = new Opcion({
        votos: 9,
        nombre: '5',
        pregunta: pregunta6._id
    }),
    opcion22 = new Opcion({
        votos: 8,
        nombre: '6',
        pregunta: pregunta6._id
    }),
    opcion23 = new Opcion({
        votos: 4,
        nombre: '7',
        pregunta: pregunta6._id
    }),
    opcion24 = new Opcion({
        votos: 2,
        nombre: '8',
        pregunta: pregunta6._id
    }),
    opcion25 = new Opcion({
        votos: 2,
        nombre: '9',
        pregunta: pregunta6._id
    }),
    opcion26 = new Opcion({
        votos: 1,
        nombre: '10',
        pregunta: pregunta6._id
    })

let opcion27 = new Opcion({
        votos: 121,
        nombre: 'PP',
        pregunta: pregunta7._id
    }),
    opcion28 = new Opcion({
        votos: 95,
        nombre: 'PSOE',
        pregunta: pregunta7._id
    }),
    opcion29 = new Opcion({
        votos: 75,
        nombre: 'Podemos',
        pregunta: pregunta7._id
    }),
    opcion30 = new Opcion({
        votos: 40,
        nombre: 'Ciudadanos',
        pregunta: pregunta7._id
    }),
    opcion31 = new Opcion({
        votos: 4,
        nombre: 'Fifa 2016',
        pregunta: pregunta4._id
    }),
    opcion32 = new Opcion({
        votos: 1,
        nombre: 'UPyD',
        pregunta: pregunta7._id
    }),
    opcion33 = new Opcion({
        votos: 40,
        nombre: 'Otros',
        pregunta: pregunta4._id
    })

let encuestas = [ encuesta1, encuesta2, encuesta3 ]
let preguntas = [ pregunta1, pregunta2, pregunta3, pregunta4, pregunta5,
                pregunta6, pregunta7]
let opciones = [ opcion1, opcion2, opcion3, opcion4, opcion5, opcion6, opcion7,
                opcion8, opcion9, opcion10, opcion11, opcion12, opcion13,
                opcion14, opcion15, opcion16, opcion17, opcion18, opcion19,
                opcion20, opcion21, opcion22, opcion23, opcion24, opcion25,
                opcion26, opcion26, opcion27, opcion28, opcion29, opcion30,
                opcion31, opcion32, opcion33]

// Persistencia
encuestas.forEach( e => e.save() )
preguntas.forEach( p => p.save( err => {
    if (!err) {
        Pregunta.find({}).populate('encuesta')
    }
}))
opciones.forEach( o => o.save( err => {
    if (!err) {
        Opcion.find({}).populate('pregunta')
    }
}))

// Desconección de mLab
mongoose.disconnect()
