const express = require("express");
const net = require("net");
const infoSensor = require("./models/infoSensor");

require("./db");
const port = 9898;

//Estos valores habrá que recibirlos por MQTT.
var lugarSensor = "Puerta principal";
var movimiento = false;
var sonido = false;

const server = net
  .createServer((socket) => {
    socket.on("data", (data) => {
      console.log(data.toString());
      console.log();
    });

    //AQUI ENVIO LOS DATOS A LA BD, CABE MENCIONAR QUE ESTE METODO SOLO SE LLAMA AL INICIAR EL SERVIDOR.
    actualizacionSensor = new infoSensor({
      lugarSensor,
      movimiento,
      sonido,
    });

    setInterval(() => {
      socket.write("----Actualizacion del sensor------");
    }, 1000);
    server.on("connection", (conn) => {
      console.log(conn.id);
    });
    var iterador = 1;

    if (iterador > 5) socket.end("Cerrando comunicaciones");
    //Se guarda la info en la BD y se envia por websocket a los clientes conectados.
    actualizacionSensor.save((err, document) => {
      if (err) console.error(err);
      socket.write("----Actualización del sensor");
      socket.write(document.toString());
      socket.write("----------------------------");
    });
  })
  .on("error", (err) => {
    console.error(err);
  });

//Se abre el server escuchando en el puerto = port.
server.listen(port, () => {
  console.log(`Servidor abierto en ${port}`);
});
