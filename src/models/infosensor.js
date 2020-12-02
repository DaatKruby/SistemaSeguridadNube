//modelo de la coleccion que usaremos, si quieres añadir o modificar algo nomas sigue el patrón.
//(Esto es lo que se guarda cuando alguien hace un post a nuestro server..)
const { Schema, model } = require("mongoose");

const infoSensor = new Schema({
  id: {
    type: String,
  },
  dataMov: {
    type: Number,
  },
  dataSound: {
    type: Number,
  },
  lvlBattery: {
    type: Number,
  },
  date: {
    type: Date,
  },
  activity: {
    type: Boolean,
  },
});

module.exports = model("infoSensor", infoSensor);
