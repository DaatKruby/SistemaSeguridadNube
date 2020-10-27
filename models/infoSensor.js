const {Schema, model} = require('mongoose');

const infoSensor = new Schema({
    lugarSensor: {
        type: String
    },
    movimiento: {
        type: Boolean,
        default: false
    },
    sonido: {
        type: Boolean,
        default: false
    },
    fecha: {
        type: Date,
        default: new Date()
    }
});

module.exports = model('infoSensor', infoSensor);