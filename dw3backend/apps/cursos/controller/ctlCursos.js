// Arquivo: apps/cursos/controller/ctlCursos.js

const mdlCursos = require("../model/mdlCursos");

const getAllCursos = (req, res) => (async () => {
    let registro = await mdlCursos.getAllCursos();
    res.json({ status: "ok", registro: registro });
})();

const getCursoByID = (req, res) => (async () => {
    const cursoID = parseInt(req.body.cursoid);
    let registro = await mdlCursos.getCursoByID(cursoID);
    res.json({ status: "ok", registro: registro });
})();

const insertCursos = (req, res) => (async () => {
    const registro = req.body;
    let { msg, linhasAfetadas } = await mdlCursos.insertCursos(registro);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
})();

const updateCursos = (req, res) => (async () => {
    const registro = req.body;
    // let { msg, linhasAfetadas } = await mdlCursos.updateCursos(registro);
    res.json({ status: "ok", registro: registro });
})();

const deleteCursos = (req, res) => (async () => {
    const registro = req.body;
    let { msg, linhasAfetadas } = await mdlCursos.deleteCursos(registro.cursoid);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
})();

// Bloco de exportação completo e correto
module.exports = {
    getAllCursos,
    getCursoByID,
    insertCursos,
    updateCursos,
    deleteCursos,
};