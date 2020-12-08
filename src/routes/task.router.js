const express = require('express');const router = express.Router();

const Sensor = require('../models/infosensor');
const Clustering=require("../clustering");

// const {isActividad} = require('../helper.js');

router.get('/', async(req, res) => {
    const sensorInfo = await Sensor.find(); 
    res.json(sensorInfo);
});

router.get('/clustering', async(req, res) => {
    //(new Date("2020-11-01T00:00"), new Date("2020-12-30T00:00")
    const fecha1=new Date(req.query.fecha1);
    const fecha2=new Date(req.query.fecha2);
    Clustering.obtenerClusters(fecha1, fecha2, (json)=>{
        if (json===null){
            res.status(400).send("Upsssss, something went wrong");
        } else {
            res.json(json);   
        }
        res.end();
    });
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