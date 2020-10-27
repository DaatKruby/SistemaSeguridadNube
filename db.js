const mongoose = require('mongoose');
const db = mongoose.connection;

const nombre_bd= "SistemaSeguridad"
mongoose.connect(`mongodb://localhost/SistemaSeguridad${nombre_bd}`, {useNewUrlParser: true});

db.once("open", () => {
    console.log(`Conectado correctamente a base de datos ${nombre_bd}`);
}).on('error', (error) => {
    console.error(`Error: ${error}`);
});