const express = require("express");
const morgan = require("morgan");
const path = require('path');
const app = express();


const { mongoose } = require('./db');

//Config para que ignore y acepte accesos de origen según la CORS POLICY (no le muevas nada xd)
app.use(function(req,res,next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Configuramos un puerto predeterminado por si se hace deploy a la nube externa (remota).
app.set('port', 4000);
//process.env.PORT || Esto se pone si queremos ponerle el primer puerto que este disponible, por motivos de prueba, yo asigne el de 4000

//MiddleWares
app.use(morgan('dev')); //para no estar reiniciando
app.use(express.json()); //para recibir y enviar en formato JSON

//Rutas
app.use('/api/sensorinfo', require('./routes/task.router.js')); //Mi router a donde se harán las peticiones (URL_API)
//para acceder, tienes que entrar a localhost:4000/api/sensorinfo, te debe de retornar un JSON.


//Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')))

//empezando el server
app.listen(app.get('port'), () => {
  console.log(`Servidor en el puerto ${app.get('port')}`);
});


/*
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
*/