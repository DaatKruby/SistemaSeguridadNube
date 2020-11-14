const mongoose = require("mongoose");

//config database
const nombre_bd = "sistemaseguridad";
const URI = `mongodb://localhost/${nombre_bd}`;
mongoose
  .connect(URI, { useUnifiedTopology: true, useNewUrlParser: true }) //conecto a la bd
  .then((db) => console.log("Conectado a la base de datos"))
  .catch((err) => console.log(err));

module.exports = mongoose;

/*
const db = mongoose.connection;

db.once("open", () => {
  console.log(`Conectado correctamente a base de datos ${nombre_bd}`);
}).on("error", (error) => {
  console.error(`Error: ${error}`);
});
*/