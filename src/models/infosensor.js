//modelo de la coleccion que usaremos, si quieres añadir o modificar algo nomas sigue el patrón.
//(Esto es lo que se guarda cuando alguien hace un post a nuestro server..)
const {Schema, model} = require('mongoose');

const infoSensor = new Schema({
    lugarSensor: {
        type: String
    },
    movimiento: {
        type: Number,
        default: false
    },
    sonido: {
        type: Number,
        default: false
    },
    fecha: {
        type: Date,
        default: new Date()
    }
});

module.exports = model('infoSensor', infoSensor);