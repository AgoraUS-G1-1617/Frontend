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
let encuesta1 = new Encuesta({ id_votacion:1,  cp: 41013, titulo: "Encuesta 1" }),
    encuesta2 = new Encuesta({ id_votacion:2,  cp: 41012, titulo: "Encuesta 2" }),
    encuesta3 = new Encuesta({ id_votacion:3,  cp: 28052,titulo: "Encuesta 3" })

// Preguntas
let pregunta1 = new Pregunta({
				id_pregunta:0,
        texto_pregunta: '¿Quién debe de ser el presidente de la comunidad?',
        encuesta: encuesta1._id
    }),
    pregunta2 = new Pregunta({
				id_pregunta:1,
        texto_pregunta: '¿Consideras las cuentas de este año correctas?',
        encuesta: encuesta1._id
    }),
    pregunta3 = new Pregunta({
			 	id_pregunta:2,
        texto_pregunta: '¿En general, estás satisfecho con el antiguo presidente?',
        encuesta: encuesta1._id
    })

let pregunta4 = new Pregunta({
				id_pregunta:3,
        texto_pregunta: '¿Cual es el mejor juego de nuestra tienda?',
        encuesta: encuesta2._id
    }),
    pregunta5 = new Pregunta({
				id_pregunta:4,
        texto_pregunta: '¿Qué le parece nuestra politica de precios?',
        encuesta: encuesta2._id
    }),
    pregunta6 = new Pregunta({
				id_pregunta:5,
        texto_pregunta: '¿En general, como calificarias nuestra tienda?',
        encuesta: encuesta2._id
    })

let pregunta7 = new Pregunta({
				id_pregunta:6,
        texto_pregunta: '¿Quien debería de ganar las elecciones?',
        encuesta: encuesta3._id
    })

// Opciones
let opcion1 = new Opcion({
				id_opcion:1,
        votos: 10,
        texto_opcion: 'Manuel',
        pregunta: pregunta1._id
    }),
    opcion2 = new Opcion({
				id_opcion:2,
        votos: 3,
        texto_opcion: 'Juan',
        pregunta: pregunta1._id
    }),
    opcion3 = new Opcion({
				id_opcion:3,
        votos: 0,
        texto_opcion: 'Antonio',
        pregunta: pregunta1._id
    })

let opcion4 = new Opcion({
				id_opcion:4,
        votos: 20,
        texto_opcion: 'Sí',
        pregunta: pregunta2._id
    }),
    opcion5 = new Opcion({
			id_opcion:5,
        votos: 1,
        texto_opcion: 'No',
        pregunta: pregunta2._id
    })

let opcion6 = new Opcion({
	id_opcion:6,
        votos: 19,
        texto_opcion: 'Sí',
        pregunta: pregunta3._id
    }),
    opcion7 = new Opcion({
			id_opcion:7,
        votos: 1,
        texto_opcion: 'No',
        pregunta: pregunta3._id
    }),
    opcion8 = new Opcion({
			id_opcion:8,
        votos: 3,
        texto_opcion: 'NS/NC',
        pregunta: pregunta3._id
    })

let opcion9 = new Opcion({
	id_opcion:9,
        votos: 40,
        texto_opcion: 'Fifa 2016',
        pregunta: pregunta4._id
    }),
    opcion10 = new Opcion({
			id_opcion:10,
        votos: 2,
        texto_opcion: 'Pro Evolution 2016',
        pregunta: pregunta4._id
    }),
    opcion11 = new Opcion({
			id_opcion:11,
        votos: 77,
        texto_opcion: 'World Of Warcraft',
        pregunta: pregunta4._id
    }),
    opcion12 = new Opcion({
			id_opcion:12,
        votos: 100,
        texto_opcion: 'Call Of Duty',
        pregunta: pregunta4._id
    }),
    opcion13 = new Opcion({
			id_opcion:13,
        votos: 1000,
        texto_opcion: 'Bien, precio correcto',
        pregunta: pregunta5._id
    }),
    opcion14 = new Opcion({
			id_opcion:14,
        votos: 10,
        texto_opcion: 'Mal, en otras tiendas estan mas baratos',
        pregunta: pregunta5._id
    })

let opcion15 = new Opcion({
	id_opcion:15,
        votos: 100,
        texto_opcion: 'Muy caros',
        pregunta: pregunta5._id
    })

let opcion16 = new Opcion({
	id_opcion:16,
        votos: 2,
        texto_opcion: '0',
        pregunta: pregunta6._id
    }),
    opcion17 = new Opcion({
			id_opcion:17,
        votos: 5,
        texto_opcion: '1',
        pregunta: pregunta6._id
    }),
    opcion18 = new Opcion({
			id_opcion:18,
        votos: 2,
        texto_opcion: '2',
        pregunta: pregunta6._id
    }),
    opcion19 = new Opcion({
			id_opcion:19,
        votos: 8,
        texto_opcion: '3',
        pregunta: pregunta6._id
    }),
    opcion20 = new Opcion({
			id_opcion:20,
        votos: 2,
        texto_opcion: '4',
        pregunta: pregunta6._id
    }),
    opcion21 = new Opcion({
			id_opcion:21,
        votos: 9,
        texto_opcion: '5',
        pregunta: pregunta6._id
    }),
    opcion22 = new Opcion({
			id_opcion:22,
        votos: 8,
        texto_opcion: '6',
        pregunta: pregunta6._id
    }),
    opcion23 = new Opcion({
			id_opcion:23,
        votos: 4,
        texto_opcion: '7',
        pregunta: pregunta6._id
    }),
    opcion24 = new Opcion({
			id_opcion:24,
        votos: 2,
        texto_opcion: '8',
        pregunta: pregunta6._id
    }),
    opcion25 = new Opcion({
			id_opcion:25,
        votos: 2,
        texto_opcion: '9',
        pregunta: pregunta6._id
    }),
    opcion26 = new Opcion({
			id_opcion:26,
        votos: 1,
        texto_opcion: '10',
        pregunta: pregunta6._id
    })

let opcion27 = new Opcion({
	id_opcion:27,
        votos: 121,
        texto_opcion: 'PP',
        pregunta: pregunta7._id
    }),
    opcion28 = new Opcion({
			id_opcion:28,
        votos: 95,
        texto_opcion: 'PSOE',
        pregunta: pregunta7._id
    }),
    opcion29 = new Opcion({
			id_opcion:29,
        votos: 75,
        texto_opcion: 'Podemos',
        pregunta: pregunta7._id
    }),
    opcion30 = new Opcion({
			id_opcion:30,
        votos: 40,
        texto_opcion: 'Ciudadanos',
        pregunta: pregunta7._id
    }),
    opcion31 = new Opcion({
			id_opcion:31,
        votos: 4,
        texto_opcion: 'Fifa 2016',
        pregunta: pregunta4._id
    }),
    opcion32 = new Opcion({
			id_opcion:32,
        votos: 1,
        texto_opcion: 'UPyD',
        pregunta: pregunta7._id
    }),
    opcion33 = new Opcion({
			id_opcion:33,
        votos: 40,
        texto_opcion: 'Otros',
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
