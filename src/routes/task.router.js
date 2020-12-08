const express = require('express'); const router = express.Router();

const Sensor = require('../models/infosensor');
const Clustering = require("../clustering");
const Regresion = require("../regresion");
const { restart } = require('nodemon');


router.get('/', async (req, res) => {
    const sensorInfo = await Sensor.find();
    res.json(sensorInfo);
});

router.get('/clustering', async (req, res) => {
    //(new Date("2020-11-01T00:00"), new Date("2020-12-30T00:00")
    try{
        const fecha1 = new Date(req.query.fecha1);
        const fecha2 = new Date(req.query.fecha2);
        Clustering.obtenerClusters(fecha1, fecha2, (json) => {
            res.json(json);
            res.end();
        });
    } catch (error){
        res.status(400).send("Ocurrio un error al generar el clustering");
            res.end();
    }
});

router.get('/regresion', async (req, res) => {
    try {
        const fecha1 = new Date(req.query.fecha1);
        const fecha2 = new Date(req.query.fecha2);
        Regresion.getTablaRegresion(fecha1, fecha2, (json) => {
            res.json(json);
            res.end();
        });
    } catch (error) {
        res.status(400).send("Ocurrio un error al calcular la regresion");
        res.end();
    }
    //res.status(400).send("Error al calcular la regresion");
});

//Metodo POST para añadir información a la BD, en este caso puse el lugar del sensor, nivel (bruto) de movimiento y de sonido, junto con su fecha
router.post('/iniciarSesion', async (req, res) => {
    // const {lugarSensor, movimiento, sonido, fecha }= req.body;
    // const infoSensor = new Sensor({lugarSensor, movimiento, sonido, fecha});
    // await infoSensor.save(); //aqui le digo que guarde lo recibido en la bd
    res.json({ aceptado: true }); //envio una respuesta al que realizó la petición post
});

router.post('/infoSensor', async (req, res) => {
    const { id, dataMov, dataSound, lvlBattery, date, activity } = req.body;
    const infoSensor = new Sensor({ id, dataMov, dataSound, lvlBattery, date, activity });
    await infoSensor.save();
    res.json({ status: 'recibido', id, dataMov, dataSound, lvlBattery, date, activity });
    //isActividad(subject, text, receiver, activity); este es el que manda el correo, necesitamos poner un correo en el archivo "emailer"
});

module.exports = router;