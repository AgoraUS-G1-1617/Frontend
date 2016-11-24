// Imports
const express = require('express'),
app = express(),
router = express.Router(),
port = 8080


// Public folders
app.use(express.static(__dirname + '/views'))
app.use(express.static(__dirname + '/src'))


// App's routes
router.get('/', function(req, res) {
    res.sendFile('index.html')
})
router.get('/*', function(req, res) {
    res.sendFile(__dirname+'/views/index.html')
})
app.use(router)


// Starting node server
app.listen(port, () => {
    console.log("Magic happens on port " + port)
})
