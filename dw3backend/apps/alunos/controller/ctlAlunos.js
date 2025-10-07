// Arquivo: apps/alunos/controller/ctlAlunos.js

const mdlAlunos = require("../model/mdlAlunos");

const getAllAlunos = (req, res) => (async () => {
    let registro = await mdlAlunos.getAllAlunos();
    res.json({ status: "ok", registro: registro });
})();

const getAlunoByID = (req, res) => (async () => {
    const alunoID = parseInt(req.body.alunoid);
    let registro = await mdlAlunos.getAlunoByID(alunoID);
    res.json({ status: "ok", registro: registro });
})();

const insertAlunos = (req, res) => (async () => {
    const registro = req.body;
    
    if (registro.datanascimento === '') {
        registro.datanascimento = null;
    }
    if (registro.cursoid === '') {
        registro.cursoid = null;
    }
    
    let { msg, linhasAfetadas } = await mdlAlunos.insertAlunos(registro);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
})();

// CORREÇÃO APLICADA AQUI
const updateAlunos = (req, res) => (async () => {
    const registro = req.body;
    
    // A linha abaixo foi descomentada para chamar o model e salvar as alterações.
    let { msg, linhasAfetadas } = await mdlAlunos.updateAlunos(registro); 
    
    // A resposta agora reflete o resultado da operação no banco de dados.
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
})();

const deleteAlunos = (req, res) => (async () => {
    // O controller envia apenas o ID para o model
    let { msg, linhasAfetadas } = await mdlAlunos.deleteAlunos(req.body.alunoid);
    res.json({ status: msg, linhasAfetadas: linhasAfetadas });
})();

module.exports = {
    getAllAlunos,
    getAlunoByID,
    insertAlunos,
    updateAlunos,
    deleteAlunos,
};