/*
MIT License

Copyright (c) 2025 Douglas Silva

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
const fs = require('fs');
const xlsx = require('xlsx');
const readline = require('readline');
const path = require('path');
const { createCanvas } = require('@napi-rs/canvas');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Função para obter o caminho da pasta
function perguntarCaminho(prompt, defaultPath) {
  return new Promise((resolve) => {
    rl.question(`${prompt} (Pressione Enter para usar o padrão: ${defaultPath}): `, (resposta) => {
      resolve(resposta || defaultPath);
    });
  });
}

// Perguntar ao usuário as pastas para salvar
async function obterDiretorios() {
  const PASTA_SAIDA = await perguntarCaminho('Digite o caminho para salvar os arquivos', 'C:\\Arquivos');
  const PASTA_IMAGENS = await perguntarCaminho('Digite o caminho para salvar as fotos', 'C:\\Arquivos\\fotos');

  // Verifica se os diretórios existem, se não, cria
  if (!fs.existsSync(PASTA_SAIDA)) {
    fs.mkdirSync(PASTA_SAIDA, { recursive: true });
  }

  if (!fs.existsSync(PASTA_IMAGENS)) {
    fs.mkdirSync(PASTA_IMAGENS, { recursive: true });
  }

  return { PASTA_SAIDA, PASTA_IMAGENS };
}

// Listas pré-definidas para funções e departamentos
const FUNCOES = ['Analista', 'Técnico', 'Gerente', 'Supervisor', 'Assistente'];
const DEPARTAMENTOS = ['RH', 'TI', 'Financeiro', 'Comercial', 'Operacional'];
const CNPJ_EMPRESA = '82.341.199/0001-86';

// Gera um CPF válido aleatório
function gerarCPF() {
  let n = () => Math.floor(Math.random() * 9);
  let cpf = Array.from({ length: 9 }, () => n());

  for (let j = 0; j < 2; j++) {
    let soma = cpf.reduce((acc, val, i) => acc + val * (10 + j - i), 0);
    let resto = soma % 11;
    cpf.push(resto < 2 ? 0 : 11 - resto);
  }
  return cpf.join('');
}

// Gera um PIS válido aleatório
function gerarPIS() {
  let n = () => Math.floor(Math.random() * 10);
  let pis = Array.from({ length: 10 }, () => n());
  let pesos = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let soma = pis.reduce((acc, val, i) => acc + val * pesos[i], 0);
  let digito = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  return pis.join('') + digito;
}

// Gera uma data de admissão aleatória entre 2010 e 2024
function gerarDataAdmissao() {
  let ano = Math.floor(Math.random() * (2024 - 2010 + 1)) + 2010;
  let mes = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
  let dia = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
  return `${dia}/${mes}/${ano}`;
}

// Gera uma imagem fictícia para o funcionário
function gerarImagemFuncionario(cpf, PASTA_IMAGENS) {
  const largura = 200;
  const altura = 200;
  const canvas = createCanvas(largura, altura);
  const ctx = canvas.getContext('2d');

  // Fundo aleatório
  ctx.fillStyle = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
  ctx.fillRect(0, 0, largura, altura);

  // Texto com o CPF
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 16px Arial';
  ctx.fillText(`CPF: ${cpf}`, 30, 100);

  // Caminho para salvar a imagem
  const caminhoImagem = path.join(PASTA_IMAGENS, `${cpf}.png`);
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(caminhoImagem, buffer);

  return caminhoImagem;
}

// Função para criar funcionários fictícios
function gerarFuncionarios(quantidade, PASTA_IMAGENS) {
  let funcionarios = [];

  for (let i = 1; i <= quantidade; i++) {
    let cpf = gerarCPF();
    let caminhoImagem = gerarImagemFuncionario(cpf, PASTA_IMAGENS);

    funcionarios.push({
      Nome: `Funcionário API ${i}`,
      Identificador: i,
      N_Folha: i,
      PIS: gerarPIS(),
      CPF: cpf,
      Empresa: CNPJ_EMPRESA,
      Horário: 1,
      Função: FUNCOES[Math.floor(Math.random() * FUNCOES.length)],
      Departamento: DEPARTAMENTOS[Math.floor(Math.random() * DEPARTAMENTOS.length)],
      Admissão: gerarDataAdmissao(),
      Estrutura: '',
    });
  }

  return funcionarios;
}

// Cria um arquivo Excel na pasta especificada
function criarArquivoExcel(funcionarios, PASTA_SAIDA) {
  const ws = xlsx.utils.json_to_sheet(funcionarios);
  const wb = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(wb, ws, 'Funcionarios');

  const caminhoArquivo = path.join(PASTA_SAIDA, 'funcionarios.xlsx');
  xlsx.writeFile(wb, caminhoArquivo);
  console.log(`📂 Arquivo Excel salvo em: ${caminhoArquivo}`);
}

// Cria um arquivo PRN (texto alinhado) na pasta especificada
function criarArquivoPRN(funcionarios, PASTA_SAIDA) {
  // Define os tamanhos de cada campo (ajuste conforme necessário)
  const campos = [
    { nome: 'Nome', tamanho: 50 },
    { nome: 'Identificador', tamanho: 10 },
    { nome: 'N_Folha', tamanho: 10 },
    { nome: 'PIS', tamanho: 15 },
    { nome: 'CPF', tamanho: 15 },
    { nome: 'Empresa', tamanho: 20 },
    { nome: 'Horário', tamanho: 10 },
    { nome: 'Função', tamanho: 30 },
    { nome: 'Departamento', tamanho: 30 },
    { nome: 'Admissão', tamanho: 15 },
    { nome: 'Estrutura', tamanho: 10 },
  ];

  // Cria o cabeçalho
  let cabecalho = campos.map((campo) => campo.nome.padEnd(campo.tamanho).substring(0, campo.tamanho)).join('');

  // Cria as linhas de dados
  let linhas = funcionarios.map((func) => {
    return campos
      .map((campo) => {
        let valor = String(func[campo.nome] || '');
        return valor.padEnd(campo.tamanho).substring(0, campo.tamanho);
      })
      .join('');
  });

  // Junta tudo
  let conteudo = [cabecalho, ...linhas].join('\r\n');

  const caminhoArquivo = path.join(PASTA_SAIDA, 'funcionarios.prn');
  fs.writeFileSync(caminhoArquivo, conteudo, 'utf8');
  console.log(`📂 Arquivo PRN salvo em: ${caminhoArquivo}`);
}

// Cria um arquivo CSV na pasta especificada
function criarArquivoCSV(funcionarios, PASTA_SAIDA) {
  const cabecalho = Object.keys(funcionarios[0]).join(';');
  const linhas = funcionarios.map((func) => Object.values(func).join(';'));
  const conteudo = [cabecalho, ...linhas].join('\r\n');

  const caminhoArquivo = path.join(PASTA_SAIDA, 'funcionarios.csv');
  fs.writeFileSync(caminhoArquivo, conteudo, 'utf8');
  console.log(`📂 Arquivo CSV salvo em: ${caminhoArquivo}`);
}

// Perguntar ao usuário quantos funcionários deseja criar e o formato
async function iniciar() {
  const { PASTA_SAIDA, PASTA_IMAGENS } = await obterDiretorios();

  rl.question('Quantos funcionários deseja gerar? ', (quantidade) => {
    rl.question('Escolha o formato (1 - Excel, 2 - PRN, 3 - CSV): ', (formato) => {
      const funcionarios = gerarFuncionarios(parseInt(quantidade), PASTA_IMAGENS);

      switch (formato) {
        case '1':
          criarArquivoExcel(funcionarios, PASTA_SAIDA);
          break;
        case '2':
          criarArquivoPRN(funcionarios, PASTA_SAIDA);
          break;
        case '3':
          criarArquivoCSV(funcionarios, PASTA_SAIDA);
          break;
        default:
          console.log('Opção inválida. Gerando arquivo Excel por padrão.');
          criarArquivoExcel(funcionarios, PASTA_SAIDA);
      }

      console.log(`📸 Imagens salvas em: ${PASTA_IMAGENS}`);

      // Fecha a interface readline atual
      rl.close();

      // Chama a função para aguardar tecla
      aguardarTeclaParaSair();
    });
  });
}

// Função para aguardar clique para sair do CMD
function aguardarTeclaParaSair() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log('\n✅ Arquivo de funcionários criado com êxito. Pressione qualquer tecla para fechar...');

  // Configura o stdin para modo raw para capturar qualquer tecla
  process.stdin.setRawMode(true);
  process.stdin.resume();

  process.stdin.once('data', () => {
    process.stdin.setRawMode(false);
    rl.close();
    process.exit(0);
  });
}
iniciar();
