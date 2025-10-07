// Arquivo: apps/clientes/model/mdlClientes.js

const db = require("../../../database/databaseconfig");

const getAllClientes = async () => {
  return (
    await db.query(
      "SELECT * FROM clientes WHERE deleted = false ORDER BY clienteid DESC"
    )
  ).rows;
};

const getClienteByID = async (clienteIDPar) => {
  return (
    await db.query(
      "SELECT * FROM clientes WHERE clienteid = $1 AND deleted = false",
      [clienteIDPar]
    )
  ).rows;
};

const insertCliente = async (clienteREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "INSERT INTO clientes (codigo, nome, endereco, ativo) VALUES ($1, $2, $3, $4) RETURNING clienteid",
        [
          clienteREGPar.codigo,
          clienteREGPar.nome,
          clienteREGPar.endereco,
          clienteREGPar.ativo,
        ]
      )
    ).rows[0].clienteid;
  } catch (error) {
    msg = "[mdlClientes|insertCliente] " + error.detail;
    linhasAfetadas = -1;
  }
  return { msg, linhasAfetadas };
};

const updateCliente = async (clienteREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE clientes SET codigo=$1, nome=$2, endereco=$3, ativo=$4 WHERE clienteid=$5",
        [
          clienteREGPar.codigo,
          clienteREGPar.nome,
          clienteREGPar.endereco,
          clienteREGPar.ativo,
          clienteREGPar.clienteid,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlClientes|updateCliente] " + error.detail;
    linhasAfetadas = -1;
  }
  return { msg, linhasAfetadas };
};

const deleteCliente = async (clienteIDPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query("UPDATE clientes SET deleted=true WHERE clienteid=$1", [
        clienteIDPar,
      ])
    ).rowCount;
  } catch (error) {
    msg = "[mdlClientes|deleteCliente] " + error.detail;
    linhasAfetadas = -1;
  }
  return { msg, linhasAfetadas };
};

// Bloco de exportação completo e correto
module.exports = {
  getAllClientes,
  getClienteByID,
  insertCliente,
  updateCliente,
  deleteCliente,
};