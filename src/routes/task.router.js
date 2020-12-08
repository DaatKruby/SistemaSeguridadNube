const express = require('express');const router = express.Router();

const Sensor = require('../models/infosensor');


router.get('/', async(req, res) => {
    const sensorInfo = await Sensor.find(); 
    res.json(sensorInfo);
});

//Metodo POST para añadir información a la BD, en este caso puse el lugar del sensor, nivel (bruto) de movimiento y de sonido, junto con su fecha
router.post('/iniciarSesion', async(req,res) => {
    // const {lugarSensor, movimiento, sonido, fecha }= req.body;
    // const infoSensor = new Sensor({lugarSensor, movimiento, sonido, fecha});
    // await infoSensor.save(); //aqui le digo que guarde lo recibido en la bd
    res.json({aceptado:true}); //envio una respuesta al que realizó la petición post
});

router.post('/infoSensor', async(req,res) => {
    const {id, dataMov, dataSound, lvlBattery,date, activity }= req.body;
    const infoSensor = new Sensor({id, dataMov, dataSound, lvlBattery, date, activity});
    await infoSensor.save(); 
    res.json({status: 'recibido', id,dataMov, dataSound,lvlBattery, date, activity}); 
    //isActividad(subject, text, receiver, activity); este es el que manda el correo, necesitamos poner un correo en el archivo "emailer"
});

module.exports = router;