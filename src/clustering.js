//npm install skmeans
const skmeans = require("skmeans");
const modelSensor = require("./models/infosensor");

function obtenerClusters(fecha1, fecha2, callback) {
    var filtro = { date: { $gte: fecha1, $lte: fecha2 } };
    modelSensor.find(filtro, {}, function (err, sensores) {
        if (err == null) {
            sensoresArr = jsonToArrayCluster(sensores);
            modelo = getModelo(sensoresArr, 2);
            var json = getResultadoJSON(modelo, sensores);
            callback(json);
            
        } else{
            console.log(err);
            callback(null);
            
        }
    });
}

function getResultadoJSON(modelo, sensores) {
    var json = {};
    var array = [];
    var sensor = null;
    const idxs = modelo.idxs;
    json.K = modelo.k;
    json.Centroides = modelo.centroids;
    for (var i = 0; i < sensores.length; i++) {
        sensor = sensores[i];
        array.push({
            dataMov: sensor.dataMov,
            dataSound: sensor.dataSound,
            activity: sensor.activity,
            grupo: idxs[i]
        });
    }
    json.Datos = array;
    return json;
}

function jsonToArrayCluster(sensores) {
    var res = [];
    var sensor;
    for (var i = 0; i < sensores.length; i++) {
        sensor = sensores[i];
        res.push([sensor.dataMov, sensor.dataSound]);
    }
    return res;
}


function getModelo(datos, k) {
    var res = skmeans(datos, k);
    return res;
}

function getPertencianEnCluster(dato, modelo) {
    return modelo.test(dato).idx;
}

module.exports.getModelo = getModelo;
module.exports.getPertencianEnCluster = getPertencianEnCluster;
module.exports.obtenerClusters = obtenerClusters;