const mongoose = require("mongoose");

//config database


const host = 'localhost';
const port = '27017';
const nombre_bd = "sistemaseguridad";


const URI = `mongodb://localhost/${nombre_bd}`;


const URL = `mongodb://${host}:${port}/${nombre_bd}`;

mongoose
  .connect(URL, { useUnifiedTopology: true, useNewUrlParser: true }) 
  .then((db) => console.log(`conectado`))
  .catch((err) => console.log(err));

module.exports = mongoose;
