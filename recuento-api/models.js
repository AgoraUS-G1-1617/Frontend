const mongoose     = require('mongoose')

module.exports.Encuesta = mongoose.model('Encuesta', {
  id_votacion: Number,
    titulo: String,
        cp: Number
})

module.exports.Pregunta = mongoose.model('Pregunta', {
    id_pregunta: Number,
    texto_pregunta: String,
    encuesta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Encuesta'
    }
})

module.exports.Opcion = mongoose.model('Opcion', {
    id_opcion: Number,
    votos: Number,
    texto_opcion: String,
    pregunta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pregunta'
    }
})
