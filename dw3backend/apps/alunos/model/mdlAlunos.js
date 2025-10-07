const db = require("../../../database/databaseConfig");

const getAllAlunos = async () => {
  return (
    await db.query(
      "SELECT alunos.*, (SELECT descricao from CURSOS where cursoid = alunos.cursoid) as descricao " +
      "FROM alunos where deleted = false ORDER BY nome ASC"
    )
  ).rows;
};

const getAlunoByID = async (alunoIDPar) => {
  return (
    await db.query(
      "SELECT alunos.*, (SELECT descricao from CURSOS where cursoid = alunos.cursoid) as descricao " +
      "FROM alunos WHERE alunoid = $1 and deleted = false ORDER BY nome ASC",
      [alunoIDPar]
    )
  ).rows;
};

const insertAlunos = async (alunoREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "INSERT INTO alunos " + "values(default, $1, $2, $3, $4, $5, $6, $7)",
        [
          alunoREGPar.prontuario,
          alunoREGPar.nome,
          alunoREGPar.endereco,
          alunoREGPar.rendafamiliar,
          alunoREGPar.datanascimento,
          alunoREGPar.cursoid,
          alunoREGPar.deleted,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlAlunos|insertAlunos] " + error.message;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const updateAlunos = async (alunoREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE alunos SET " +
          "prontuario = $2, " +
          "nome = $3, " +
          "endereco = $4, " +
          "rendafamiliar = $5, " +
          "datanascimento = $6, " +
          "cursoid = $7, " +
          "deleted = $8 " +
          "WHERE alunoid = $1",
        [
          alunoREGPar.alunoid,
          alunoREGPar.prontuario,
          alunoREGPar.nome,
          alunoREGPar.endereco,
          alunoREGPar.rendafamiliar,
          alunoREGPar.datanascimento,
          alunoREGPar.cursoid,
          alunoREGPar.deleted,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlAlunos|UpdateAlunos] " + error.message;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

// CORREÇÃO AQUI: A função agora recebe um 'alunoID' diretamente.
const deleteAlunos = async (alunoIDPar) => {
  let linhasAfetadas;
  let msg = "ok";
    
  try {
    linhasAfetadas = (
    await db.query(
      "UPDATE alunos SET " + "deleted = true " + "WHERE alunoid = $1",
      // CORREÇÃO AQUI: Usa o ID recebido diretamente.
      [alunoIDPar]
    )
  ).rowCount;
} catch (error) {
  msg = "[mdlAlunos|DeleteAlunos] " + error.message;
  linhasAfetadas = -1;
}

return { msg, linhasAfetadas };
};

module.exports = {
  getAllAlunos,
  getAlunoByID,
  insertAlunos,
  updateAlunos,
  deleteAlunos,
};