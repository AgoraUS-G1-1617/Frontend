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
let encuesta1 = new Encuesta({ nombre: "Encuesta 1" }),
    encuesta2 = new Encuesta({ nombre: "Encuesta 2" }),
    encuesta3 = new Encuesta({ nombre: "Encuesta 3" })

// Preguntas
let pregunta1 = new Pregunta({
        cp: 41013,
        pregunta: '¿Quién debe de ser el presidente de la comunidad?',
        encuesta: encuesta1._id
    }),
    pregunta2 = new Pregunta({
        cp: 41013,
        pregunta: '¿Consideras las cuentas de este año correctas?',
        encuesta: encuesta1._id
    }),
    pregunta3 = new Pregunta({
        cp: 41013,
        pregunta: '¿En general, estás satisfecho con el antiguo presidente?',
        encuesta: encuesta1._id
    })

let pregunta4 = new Pregunta({
        cp: 41012,
        pregunta: '¿Cual es el mejor juego de nuestra tienda?',
        encuesta: encuesta2._id
    }),
    pregunta5 = new Pregunta({
        cp: 41012,
        pregunta: '¿Qué le parece nuestra politica de precios?',
        encuesta: encuesta2._id
    }),
    pregunta6 = new Pregunta({
        cp: 41012,
        pregunta: '¿En general, como calificarias nuestra tienda?',
        encuesta: encuesta2._id
    })

let pregunta7 = new Pregunta({
        cp: 28052,
        pregunta: '¿Quien debería de ganar las elecciones?',
        encuesta: encuesta3._id
    })

// Opciones
let opcion1 = new Opcion({
        recuento: 10,
        texto: 'Manuel',
        pregunta: pregunta1._id
    }),
    opcion2 = new Opcion({
        recuento: 3,
        texto: 'Juan',
        pregunta: pregunta1._id
    }),
    opcion3 = new Opcion({
        recuento: 0,
        texto: 'Antonio',
        pregunta: pregunta1._id
    })

let opcion4 = new Opcion({
        recuento: 20,
        texto: 'Sí',
        pregunta: pregunta2._id
    }),
    opcion5 = new Opcion({
        recuento: 1,
        texto: 'No',
        pregunta: pregunta2._id
    })

let opcion6 = new Opcion({
        recuento: 19,
        texto: 'Sí',
        pregunta: pregunta3._id
    }),
    opcion7 = new Opcion({
        recuento: 1,
        texto: 'No',
        pregunta: pregunta3._id
    }),
    opcion8 = new Opcion({
        recuento: 3,
        texto: 'NS/NC',
        pregunta: pregunta3._id
    })

let opcion9 = new Opcion({
        recuento: 40,
        texto: 'Fifa 2016',
        pregunta: pregunta4._id
    }),
    opcion10 = new Opcion({
        recuento: 2,
        texto: 'Pro Evolution 2016',
        pregunta: pregunta4._id
    }),
    opcion11 = new Opcion({
        recuento: 77,
        texto: 'World Of Warcraft',
        pregunta: pregunta4._id
    }),
    opcion12 = new Opcion({
        recuento: 100,
        texto: 'Call Of Duty',
        pregunta: pregunta4._id
    }),
    opcion13 = new Opcion({
        recuento: 1000,
        texto: 'Bien, precio correcto',
        pregunta: pregunta4._id
    }),
    opcion14 = new Opcion({
        recuento: 10,
        texto: 'Mal, en otras tiendas estan mas baratos',
        pregunta: pregunta4._id
    })

let opcion15 = new Opcion({
        recuento: 100,
        texto: 'Muy caros',
        pregunta: pregunta5._id
    })

let opcion16 = new Opcion({
        recuento: 2,
        texto: '0',
        pregunta: pregunta6._id
    }),
    opcion17 = new Opcion({
        recuento: 5,
        texto: '1',
        pregunta: pregunta6._id
    }),
    opcion18 = new Opcion({
        recuento: 2,
        texto: '2',
        pregunta: pregunta6._id
    }),
    opcion19 = new Opcion({
        recuento: 8,
        texto: '3',
        pregunta: pregunta6._id
    }),
    opcion20 = new Opcion({
        recuento: 2,
        texto: '4',
        pregunta: pregunta6._id
    }),
    opcion21 = new Opcion({
        recuento: 9,
        texto: '5',
        pregunta: pregunta6._id
    }),
    opcion22 = new Opcion({
        recuento: 8,
        texto: '6',
        pregunta: pregunta6._id
    }),
    opcion23 = new Opcion({
        recuento: 4,
        texto: '7',
        pregunta: pregunta6._id
    }),
    opcion24 = new Opcion({
        recuento: 2,
        texto: '8',
        pregunta: pregunta6._id
    }),
    opcion25 = new Opcion({
        recuento: 2,
        texto: '9',
        pregunta: pregunta6._id
    }),
    opcion26 = new Opcion({
        recuento: 1,
        texto: '10',
        pregunta: pregunta6._id
    })

let opcion27 = new Opcion({
        recuento: 121,
        texto: 'PP',
        pregunta: pregunta4._id
    }),
    opcion28 = new Opcion({
        recuento: 95,
        texto: 'PSOE',
        pregunta: pregunta4._id
    }),
    opcion29 = new Opcion({
        recuento: 75,
        texto: 'Podemos',
        pregunta: pregunta4._id
    }),
    opcion30 = new Opcion({
        recuento: 40,
        texto: 'Ciudadanos',
        pregunta: pregunta4._id
    }),
    opcion31 = new Opcion({
        recuento: 4,
        texto: 'Fifa 2016',
        pregunta: pregunta4._id
    }),
    opcion32 = new Opcion({
        recuento: 1,
        texto: 'UPyD',
        pregunta: pregunta4._id
    }),
    opcion33 = new Opcion({
        recuento: 40,
        texto: 'Otros',
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
