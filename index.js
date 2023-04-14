const express = require("express");
const { dbConection } = require("./database/config");
const cors = require("cors");

require("dotenv").config();

//crear el sv de express

const app = express();

//base de datos

dbConection();

//CORS
app.use(cors());

//directorio publico "middleware"
app.use(express.static("public"));

//Lectura y parseo del Body
app.use(express.json());

//rutas
app.use("/api/auth", require("./routes/auth"));

app.use("/api/events", require("./routes/events"));
//TODO: auth/crear , login , renewm
//todo: CRUD: EVENTOS

app.listen(process.env.PORT, () => {
  console.log(`servidor corriendo en puerto ${process.env.PORT}`);
});
