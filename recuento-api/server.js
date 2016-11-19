// Imports
const app = require('express')()
const routes = require('./routes')
const mongoose = require('mongoose')
const port = process.env.PORT || 3000
const db = mongoose.connection

// Conección a mLab, un hosting gratis de mongo en la nube
mongoose.connect('mongodb://barrelito:patterson@ds035333.mlab.com:35333/hennessy')

// Logging cuando haya error y cuando se conecte
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', callback => {
	console.log("Database opened successfully")
})

// Habilita CORS en la app (Cross-Origin...)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next()
})

// Nuestras rutas
app.use('/api/resultados', routes);

// Desplegar server
app.listen(port, () => {
  console.log('App listening on port ' + port);
});
