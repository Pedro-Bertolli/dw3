// arquivo: controller/calculadora.js

// Funções das operações aritméticas
const fSoma = (num1, num2) => num1 + num2;
const fSubtracao = (num1, num2) => num1 - num2;
const fMultiplicacao = (num1, num2) => num1 * num2;
const fDivisao = (num1, num2) => {
  if (num2 === 0) return "Erro: divisão por zero";
  return num1 / num2;
};

// Função que será chamada pela API
const fCalculo = (request, res) => (async () => {
  const { num1, num2, operacao } = request.body;
  let resultado;

  switch (operacao) {
    case "+":
      resultado = fSoma(num1, num2);
      break;
    case "-":
      resultado = fSubtracao(num1, num2);
      break;
    case "*":
      resultado = fMultiplicacao(num1, num2);
      break;
    case "/":
      resultado = fDivisao(num1, num2);
      break;
    default:
      resultado = "Operação inválida";
  }

  res.json({ status: "ok", resultado });
})();

module.exports = {
  fSoma,
  fSubtracao,
  fMultiplicacao,
  fDivisao,
  fCalculo
};
