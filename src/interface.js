const readline = require('readline');
const path = require('path');
const { CAMINHO_PADRAO_SAIDA, NOME_SUBPASTA_IMAGENS } = require('../config.js'); // Caminho Corrigido

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const formatosValidos = ['excel', 'prn', 'csv'];

function fazerPergunta(pergunta) {
  return new Promise((resolve) => rl.question(pergunta, resolve));
}

async function obterEntradasDoUsuario() {
  let quantidade;
  while (true) {
    const resposta = await fazerPergunta('\nDigite a quantidade de funcionários a gerar: ');
    quantidade = parseInt(resposta, 10);
    if (!isNaN(quantidade) && quantidade > 0) {
      break;
    }
    console.log('Valor inválido. Por favor, digite um número inteiro positivo.');
  }

  let formato;
  while (true) {
    const resposta = await fazerPergunta(`\nEscolha o formato de saída (${formatosValidos.join(', ')}): `);
    formato = resposta.toLowerCase().trim();
    if (formatosValidos.includes(formato)) {
      break;
    }
    console.log(`Formato inválido. Por favor, escolha entre: ${formatosValidos.join(', ')}.`);
  }

  let caminhoSaida = CAMINHO_PADRAO_SAIDA;
  const respostaCaminho = await fazerPergunta(`\nO caminho padrão para salvar os arquivos é '${caminhoSaida}'.\nDeseja usar um caminho diferente? (s/n): `);

  if (respostaCaminho.toLowerCase().trim() === 's') {
    caminhoSaida = await fazerPergunta('Digite o caminho completo da pasta de destino: ');
  }

  const caminhoImagens = path.join(caminhoSaida, NOME_SUBPASTA_IMAGENS);
  console.log(`\nOK. Arquivos serão salvos em: '${caminhoSaida}'`);
  console.log(`Imagens serão salvas em: '${caminhoImagens}'`);

  rl.close();
  return { quantidade, formato, caminhoSaida, caminhoImagens };
}

module.exports = { obterEntradasDoUsuario };
