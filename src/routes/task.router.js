const express = require('express');
const infosensor = require('../models/infosensor');
const router = express.Router();

const Sensor = require('../models/infosensor');

//Quien haga GET obtendrá la info almacenada en la BD sistemaseguridad en mongo; coleccion infosensor 
router.get('/', async(req, res) => {
    const sensorInfo = await Sensor.find(); //le digo que guarde en sensorInfo lo que mongo regrese con Sensor.find
    res.json(sensorInfo); //lo que recibo lo mando al que hace la peticion
});

//Metodo POST para añadir información a la BD, en este caso puse el lugar del sensor, nivel (bruto) de movimiento y de sonido, junto con su fecha
router.post('/', async(req,res) => {
    const {lugarSensor, movimiento, sonido, fecha }= req.body;
    const infoSensor = new Sensor({lugarSensor, movimiento, sonido, fecha});
    await infoSensor.save(); //aqui le digo que guarde lo recibido en la bd
    res.json('{status: 200, info: Todobien chavales}'); //envio una respuesta al que realizó la petición post
});

module.exports = router;