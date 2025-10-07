// Arquivo: apps/pedidos/model/mdlPedidos.js

const db = require("../../../database/databaseconfig");

const getAllPedidos = async () => {
  return (
    await db.query(
      `SELECT p.*, c.nome as nome_cliente 
       FROM pedidos p 
       JOIN clientes c ON (c.clienteid = p.clienteid) 
       WHERE p.deleted = false ORDER BY p.pedidoid DESC`
    )
  ).rows;
};

const getPedidoByID = async (pedidoIDPar) => {
  return (
    await db.query(
      "SELECT * FROM pedidos WHERE pedidoid = $1 AND deleted = false",
      [pedidoIDPar]
    )
  ).rows;
};

const insertPedido = async (pedidoREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "INSERT INTO pedidos (numero, data, valortotal, clienteid) VALUES ($1, $2, $3, $4) RETURNING pedidoid",
        [
          pedidoREGPar.numero,
          pedidoREGPar.data,
          pedidoREGPar.valortotal,
          pedidoREGPar.clienteid,
        ]
      )
    ).rows[0].pedidoid;
  } catch (error) {
    msg = "[mdlPedidos|insertPedido] " + error.detail;
    linhasAfetadas = -1;
  }
  return { msg, linhasAfetadas };
};

const updatePedido = async (pedidoREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE pedidos SET numero=$1, data=$2, valortotal=$3, clienteid=$4 WHERE pedidoid=$5",
        [
          pedidoREGPar.numero,
          pedidoREGPar.data,
          pedidoREGPar.valortotal,
          pedidoREGPar.clienteid,
          pedidoREGPar.pedidoid,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlPedidos|updatePedido] " + error.detail;
    linhasAfetadas = -1;
  }
  return { msg, linhasAfetadas };
};

const deletePedido = async (pedidoIDPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query("UPDATE pedidos SET deleted=true WHERE pedidoid=$1", [
        pedidoIDPar,
      ])
    ).rowCount;
  } catch (error) {
    msg = "[mdlPedidos|deletePedido] " + error.detail;
    linhasAfetadas = -1;
  }
  return { msg, linhasAfetadas };
};

// Bloco de exportação completo e correto
module.exports = {
  getAllPedidos,
  getPedidoByID,
  insertPedido,
  updatePedido,
  deletePedido,
};