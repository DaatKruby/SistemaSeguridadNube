const regression = require("regression");
const modelSensor = require("./models/infosensor");

function getTablaRegresion(fecha1, fecha2, callback) {
    var filtro = { date: { $gte: fecha1, $lte: fecha2 } };
    modelSensor.find(filtro, {}, function (err, sensores) {
        if (err == null) {
            let dtsProcesamiento = jsonToArrayRegresion(sensores);
            const modelo = obtenerModeloDeRegresion(dtsProcesamiento);
            let resultado = getJsonTabla(sensores, modelo);
            callback(resultado);
        } else {
            console.log(err);
            callback(null);
        }
    });
}

function getJsonTabla(dtsProce, modelo) {
    let json = {};
    let datos = [];
    for (var i = 0; i < dtsProce.length; i++) {
        let dts = dtsProce[i];
        datos.push({
            dataMov: dts.dataMov, dataSound: dts.dataSound,
            prediccionSnd: predecir(modelo, dts.dataMov)[1]
        });
    }
    return json.datos = datos;
}

function jsonToArrayRegresion(sensores) {
    var res = [];
    var sensor;
    for (var i = 0; i < sensores.length; i++) {
        sensor = sensores[i];
        res.push([sensor.dataMov, sensor.dataSound]);
    }
    return res;
}

function obtenerModeloDeRegresion(datos) {
    const result = regression.linear(datos);
    return result;
}

function predecir(regresion, x) {
    return regresion.predict(x);
}

//SIN USAR
//CALCULOS MATEMATICOS
function obtenerCoorLineaRegresion(datosSensor) {
    const n = datosSensor.length;
    const pendiente = calcularPendiente(datosSensor, n);
    const b = calcularB(datosSensor, n, pendiente);

    let xMax = 0;
    for (var i = 0; i < datosSensor.length; i++) {
        if (datosSensor[i].dataMov > xMax) {
            xMax = datosSensor[i].dataMov;
        }
    }

    const y1 = calcularY(0, pendiente, b);
    const y2 = calcularY(xMax, pendiente, b);

    return { coor1: [0, y1], coor2: [xMax, y2] };
}

function calcularY(x, pendiente, b) {
    return pendiente * x + b;
}

function calcularPendiente(datos, n) {
    var sigmaXY = 0;
    var sigmaX = 0;
    var sigmaY = 0;
    var sigmaSqrX = 0;

    var dato;
    for (var i = 0; i < datos.length; i++) {
        dato = datos[i];
        sigmaX += dato.dataMov;
        sigmaY += dato.dataSound;
        sigmaSqrX += Math.sqrt(dato.dataMov);
    }
    sigmaXY = sigmaY + sigmaX;
    return ((n * sigmaXY) - sigmaX * sigmaY) / (n * sigmaSqrX - Math.sqrt(sigmaX));
}

function calcularB(datos, n, pendiente) {
    var sigmaX = 0;
    var sigmaY = 0;
    var dato;
    for (var i = 0; i < datos.length; i++) {
        dato = datos[i];
        sigmaX += dato.dataMov;
        sigmaY += dato.dataSound;
    }
    return (sigmaY - pendiente * sigmaX) / n;
}

module.exports.getTablaRegresion = getTablaRegresion;
module.exports.predecir = predecir;