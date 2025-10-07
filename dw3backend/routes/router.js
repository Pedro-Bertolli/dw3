const express = require("express");
const routerApp = express.Router();

const appAlunos = require("../apps/alunos/controller/ctlAlunos");
const appCursos = require("../apps/cursos/controller/ctlCursos");
const appLogin = require("../apps/login/controller/ctlLogin");
const appClientes = require("../apps/clientes/controller/ctlClientes");
const appPedidos = require("../apps/pedidos/controller/ctlPedidos");

// Middleware que é específico para este router
routerApp.use((req, res, next) => {
  next();
});

routerApp.get("/", (req, res) => {
  res.send("Olá mundo!");
});

// Rotas de Alunos (Corrigido para camelCase)
routerApp.get("/getAllAlunos", appAlunos.getAllAlunos);
routerApp.post("/getAlunoByID", appLogin.AutenticaJWT, appAlunos.getAlunoByID);
routerApp.post("/insertAlunos", appLogin.AutenticaJWT, appAlunos.insertAlunos);
routerApp.post("/updateAlunos", appLogin.AutenticaJWT, appAlunos.updateAlunos); // Adicionado JWT para consistência
routerApp.post("/deleteAlunos", appLogin.AutenticaJWT, appAlunos.deleteAlunos); // Corrigido para camelCase

// Rotas de Cursos (Corrigido para camelCase)
routerApp.get("/getAllCursos", appCursos.getAllCursos);
routerApp.post("/getCursoByID", appCursos.getCursoByID);
routerApp.post("/insertCursos", appCursos.insertCursos);
routerApp.post("/updateCursos", appCursos.updateCursos);
routerApp.post("/deleteCursos", appCursos.deleteCursos);

// Rotas de Clientes (Corrigido para camelCase e singular)
routerApp.get("/getAllClientes", appLogin.AutenticaJWT, appClientes.getAllClientes);
routerApp.post("/getClienteByID", appLogin.AutenticaJWT, appClientes.getClienteByID);
routerApp.post("/insertCliente", appLogin.AutenticaJWT, appClientes.insertCliente);
routerApp.post("/updateCliente", appLogin.AutenticaJWT, appClientes.updateCliente);
routerApp.post("/deleteCliente", appLogin.AutenticaJWT, appClientes.deleteCliente);

// Rotas de Pedidos (Corrigido para camelCase e singular)
routerApp.get("/getAllPedidos", appLogin.AutenticaJWT, appPedidos.getAllPedidos);
routerApp.post("/getPedidoByID", appLogin.AutenticaJWT, appPedidos.getPedidoByID);
routerApp.post("/insertPedido", appLogin.AutenticaJWT, appPedidos.insertPedido);
routerApp.post("/updatePedido", appLogin.AutenticaJWT, appPedidos.updatePedido);
routerApp.post("/deletePedido", appLogin.AutenticaJWT, appPedidos.deletePedido);

// Rota Login
routerApp.post("/Login", appLogin.Login);
routerApp.post("/Logout", appLogin.Logout);

module.exports = routerApp;