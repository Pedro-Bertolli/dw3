// Arquivo routes/rtCursos.js

var express = require('express');
var cursosApp = require("../apps/cursos/controller/ctlCursos");
var router = express.Router();

// Middleware de autenticação
function authenticationMiddleware(req, res, next) {
  if (req.session.isLogged) {
    next();
  } else {
    res.redirect("/Login");
  }
};

router.get('/manutCursos', authenticationMiddleware, cursosApp.getManutCursos);
router.get('/insertCursos', authenticationMiddleware, cursosApp.getInsertCursos);
router.get('/viewCursos/:id', authenticationMiddleware, cursosApp.getViewCurso);
router.get('/UpdateCursos/:id', authenticationMiddleware, cursosApp.getUpdateCurso);

router.post('/insertCursos', authenticationMiddleware, cursosApp.postInsertCursos);
router.post('/UpdateCursos', authenticationMiddleware, cursosApp.postUpdateCurso);
router.post('/DeleteCursos', authenticationMiddleware, cursosApp.postDeleteCurso);

module.exports = router;