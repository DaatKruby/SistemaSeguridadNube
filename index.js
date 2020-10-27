const express= require('express');
const net = require('net');
const infoSensor = require('./models/infoSensor');

require("./db");

//Estos valores habrá que recibirlos por MQTT.
var lugarSensor = "Puerta principal";
var movimiento = false;
var sonido = false;

const port = 9898;

var actualizacionSensor;

//Creo el server con su websocket.
const server = net.createServer((socket) =>{
    socket.on("data", (data) =>{
        console.log(data.toString());
    });

    //AQUI ENVIO LOS DATOS A LA BD, CABE MENCIONAR QUE ESTE METODO SOLO SE LLAMA AL INICIAR EL SERVIDOR.
    actualizacionSensor = new infoSensor({
        lugarSensor,
        movimiento,
        sonido
    });

    //Se guarda la info en la BD y se envia por websocket a los clientes conectados.
    actualizacionSensor.save((err, document) =>{
        if(err) console.error(err);
        socket.write('----Actualización del sensor');
        socket.write(document.toString());
        socket.write('----------------------------');
    });
    //socket.end('Cerrando comunicaciones');
}).on('error', (err) =>{
    console.error(err);
});

//Se abre el server escuchando en el puerto = port.
server.listen(port, () => {
    console.log(`Servidor abierto en ${port}`);
});

