require("dotenv").config();
const express = require("express");
const { connection, authenticate } = require("./database/database");
const cors = require("cors");

const routeUsuarios = require("./routes/usuarios");
const routeVeiculos = require("./routes/veiculos");

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.use(routeUsuarios);
app.use(routeVeiculos)

authenticate(connection);
connection.sync();

app.listen(3001, () => {
  console.log("Servidor rodando em http://localhost:3001/");
});