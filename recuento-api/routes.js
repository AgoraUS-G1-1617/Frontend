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
        filter = { _id: req.query.encuesta }
    }
    Encuesta.find( filter , (err, encuestas) => {
        if (err) res.status(404).json(err)
        res.status(200).json(encuestas)
    })

})

routes.get('/preguntas', (req, res) => {
    Pregunta.find(function(err, preguntas) {
        if (err) res.status(404).json(err)
        res.status(200).json(preguntas)
    })

})

routes.get('/opciones/:pregunta', (req, res) => {
    Opcion.find({pregunta: req.params.pregunta}, function(err, opciones) {
        if (err) res.status(404).json(err)
        res.status(200).json(opciones)
    })

})

module.exports = routes
