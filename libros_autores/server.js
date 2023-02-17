const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

// Para poder entender datos de los formularios
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Configuramos el motor de templates
nunjucks.configure('templates',{
  express:app,
  autoscape:true,
  noCache:false,
  watch:true
});

// Acá van las rutas
app.use(require('./app/routes.js'))

app.get('/hola', function(req, res) {
  res.send('hola a ti')
})

app.get('/chao', function(req, res) {
  res.send('chao a ti')
})

// Se inicia la aplicación
app.listen(3000, function(){
  console.log("Servidor escuchando en el puerto 3000")
})