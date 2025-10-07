const db = require("../../../database/databaseConfig");

// CORREÇÃO AQUI: de 'GetAllCursos' para 'getAllCursos'
const getAllCursos = async () => {
  return (
    await db.query(
      "SELECT * " + "FROM cursos where deleted = false ORDER BY descricao ASC"
    )
  ).rows;
};

// CORREÇÃO AQUI: de 'GetCursoByID' para 'getCursoByID'
const getCursoByID = async (cursoIDPar) => {
  return (
    await db.query(
      "SELECT * " +
        "FROM cursos WHERE cursoid = $1 and deleted = false ORDER BY descricao ASC",
      [cursoIDPar]
    )
  ).rows;
};

// CORREÇÃO AQUI: de 'InsertCursos' para 'insertCursos'
const insertCursos = async (registroPar) => {
  //@ Atenção: aqui já começamos a utilizar a variável msg para retornor erros de banco de dados.
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "INSERT INTO cursos " + "values(default, $1, $2, $3, $4)",
        [
          registroPar.codigo,
          registroPar.descricao,
          registroPar.ativo,
          registroPar.deleted,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlCursos|insertCursos] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

// CORREÇÃO AQUI: de 'UpdateCursos' para 'updateCursos'
const updateCursos = async (registroPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE cursos SET " +
          "codigo = $2, " +
          "descricao = $3, " +
          "ativo = $4, " +
          "deleted = $5 " +
          "WHERE cursoid = $1",
        [
            registroPar.cursoid,
            registroPar.codigo,
            registroPar.descricao,
            registroPar.ativo,
            registroPar.deleted,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlCursos|UpdateCursos] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

// CORREÇÃO AQUI: de 'DeleteCursos' para 'deleteCursos'
const deleteCursos = async (registroPar) => {
  let linhasAfetadas;
  let msg = "ok";

  try {
    linhasAfetadas = (
    await db.query(
      "UPDATE cursos SET " + "deleted = true " + "WHERE cursoid = $1",
      [registroPar.cursoid]
    )
  ).rowCount;
} catch (error) {
  msg = "[mdlCursos|DeleteCursos] " + error.detail;
  linhasAfetadas = -1;
}

return { msg, linhasAfetadas };
};

// CORREÇÃO AQUI: Nomes atualizados para exportação
module.exports = {
  getAllCursos,
  getCursoByID,
  insertCursos,
  updateCursos,
  deleteCursos,
};