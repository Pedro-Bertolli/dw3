// Arquivo app/cursos/controller/ctlCursos.js
const axios = require("axios");

// Abre a página de manutenção de cursos
const getManutCursos = (req, res) => (async () => {
    userName = req.session.userName;
    try {
        const resp = await axios.get(process.env.SERVIDOR_DW3Back + "/GetAllCursos", {}); // <-- CORREÇÃO AQUI
        res.render("cursos/view/vwCursos.njk", {
            title: "Manutenção de Cursos",
            data: resp.data.registro,
            userName: userName,
        });
    } catch (erro) {
        console.log("[ctlCursos.js|getManutCursos] Try Catch: Erro de requisição");
        res.render("cursos/view/vwCursos.njk", { title: "Manutenção de Cursos", data: [], erro: erro });
    }
})();

// Abre o formulário de criação de curso
const getInsertCursos = (req, res) => (async () => {
    userName = req.session.userName;
    res.render("cursos/view/vwFCrCursos.njk", { title: "Cadastro de Cursos", userName: userName });
})();

// Processa o POST do formulário de criação
const postInsertCursos = (req, res) => (async () => {
    const token = req.session.token;
    try {
        const resp = await axios.post(
            process.env.SERVIDOR_DW3Back + "/InsertCursos", // <-- CORREÇÃO AQUI
            req.body, { headers: { "Authorization": `Bearer ${token}` } }
        );
        res.json({ status: "ok" });
    } catch (erro) {
        console.log("[ctlCursos.js|postInsertCursos] Try Catch: Erro não identificado");
        res.json({ status: erro.toString() });
    }
})();

// Abre o formulário de RUD em modo de visualização
const getViewCurso = (req, res) => (async () => {
    const id = req.params.id;
    const token = req.session.token;
    userName = req.session.userName;
    try {
        const resp = await axios.post(
            process.env.SERVIDOR_DW3Back + "/GetCursoByID", // <-- CORREÇÃO AQUI
            { cursoid: id }, { headers: { "Authorization": `Bearer ${token}` } }
        );
        res.render("cursos/view/vwFRUDrCursos.njk", {
            title: "Visualização de Curso",
            data: resp.data.registro[0],
            disabled: true,
            userName: userName,
        });
    } catch (erro) {
        console.log("[ctlCursos.js|getViewCurso] Try Catch: Erro não identificado");
        res.render("cursos/view/vwFRUDrCursos.njk", { title: "Visualização de Curso", data: {}, disabled: true, erro: erro });
    }
})();

// Abre o formulário de RUD em modo de edição
const getUpdateCurso = (req, res) => (async () => {
    const id = req.params.id;
    const token = req.session.token;
    userName = req.session.userName;
    try {
        const resp = await axios.post(
            process.env.SERVIDOR_DW3Back + "/GetCursoByID", // <-- CORREÇÃO AQUI
            { cursoid: id }, { headers: { "Authorization": `Bearer ${token}` } }
        );
        res.render("cursos/view/vwFRUDrCursos.njk", {
            title: "Alteração de Curso",
            data: resp.data.registro[0],
            disabled: false,
            userName: userName,
        });
    } catch (erro) {
        console.log("[ctlCursos.js|getUpdateCurso] Try Catch: Erro não identificado");
        res.render("cursos/view/vwFRUDrCursos.njk", { title: "Alteração de Curso", data: {}, disabled: false, erro: erro });
    }
})();

// Processa o POST do formulário de atualização
const postUpdateCurso = (req, res) => (async () => {
    const token = req.session.token;
    try {
        const resp = await axios.post(
            process.env.SERVIDOR_DW3Back + "/UpdateCursos", // <-- CORREÇÃO AQUI
            req.body, { headers: { "Authorization": `Bearer ${token}` } }
        );
        res.json({ status: "ok" });
    } catch (erro) {
        console.log("[ctlCursos.js|postUpdateCurso] Try Catch: Erro não identificado");
        res.json({ status: erro.toString() });
    }
})();

// Processa o POST de exclusão
const postDeleteCurso = (req, res) => (async () => {
    const token = req.session.token;
    try {
        const resp = await axios.post(
            process.env.SERVIDOR_DW3Back + "/DeleteCursos", // <-- CORREÇÃO AQUI
            req.body, { headers: { "Authorization": `Bearer ${token}` } }
        );
        res.json({ status: "ok" });
    } catch (erro) {
        console.log("[ctlCursos.js|postDeleteCurso] Try Catch: Erro não identificado");
        res.json({ status: erro.toString() });
    }
})();


module.exports = {
    getManutCursos,
    getInsertCursos,
    postInsertCursos,
    getViewCurso,
    getUpdateCurso,
    postUpdateCurso,
    postDeleteCurso
};