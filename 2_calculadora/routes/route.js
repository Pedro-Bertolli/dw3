// routes/route.js

const express = require("express");
const routerApp = express.Router();

// REMOVA esta linha (causa do erro)
/// const appHello = require("../controller/ctlHello");

const calc = require("../controller/calculadora");

// REMOVA estas rotas também se não estiver usando ctlHello.js
/// routerApp.get("/", appHello.hello);
/// routerApp.post("/helloUser", appHello.helloUser);

// Mantenha só a rota da calculadora:
routerApp.post("/calculadora", calc.fCalculo);

module.exports = routerApp;
