const fs = require("fs");
const xlsx = require("xlsx");
const readline = require("readline");
const path = require("path");
const { createCanvas } = require("canvas");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
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
    const PASTA_SAIDA = await perguntarCaminho("Digite o caminho para salvar o arquivo Excel", "C:\\Arquivos");
    const PASTA_IMAGENS = await perguntarCaminho("Digite o caminho para salvar as fotos", "C:\\Arquivos\\fotos");

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
const FUNCOES = ["Analista", "Técnico", "Gerente", "Supervisor", "Assistente"];
const DEPARTAMENTOS = ["RH", "TI", "Financeiro", "Comercial", "Operacional"];
const CNPJ_EMPRESA = "82.341.199/0001-86";

// Gera um CPF válido aleatório
function gerarCPF() {
    let n = () => Math.floor(Math.random() * 9);
    let cpf = Array.from({ length: 9 }, () => n());

    for (let j = 0; j < 2; j++) {
        let soma = cpf.reduce((acc, val, i) => acc + val * (10 + j - i), 0);
        let resto = soma % 11;
        cpf.push(resto < 2 ? 0 : 11 - resto);
    }
    return cpf.join("");
}

// Gera um PIS válido aleatório
function gerarPIS() {
    let n = () => Math.floor(Math.random() * 10);
    let pis = Array.from({ length: 10 }, () => n());
    let pesos = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let soma = pis.reduce((acc, val, i) => acc + val * pesos[i], 0);
    let digito = (soma % 11) < 2 ? 0 : 11 - (soma % 11);
    return pis.join("") + digito;
}

// Gera uma data de admissão aleatória entre 2010 e 2024
function gerarDataAdmissao() {
    let ano = Math.floor(Math.random() * (2024 - 2010 + 1)) + 2010;
    let mes = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0");
    let dia = String(Math.floor(Math.random() * 28) + 1).padStart(2, "0");
    return `${dia}/${mes}/${ano}`;
}

// Gera uma imagem fictícia para o funcionário
function gerarImagemFuncionario(cpf, PASTA_IMAGENS) {
    const largura = 200;
    const altura = 200;
    const canvas = createCanvas(largura, altura);
    const ctx = canvas.getContext("2d");

    // Fundo aleatório
    ctx.fillStyle = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
    ctx.fillRect(0, 0, largura, altura);

    // Texto com o CPF
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 16px Arial";
    ctx.fillText(`CPF: ${cpf}`, 30, 100);

    // Caminho para salvar a imagem
    const caminhoImagem = path.join(PASTA_IMAGENS, `${cpf}.png`);
    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync(caminhoImagem, buffer);

    return caminhoImagem;
}

// Função para criar funcionários fictícios
function gerarFuncionarios(quantidade, PASTA_IMAGENS) {
    let funcionarios = [];

    for (let i = 1; i <= quantidade; i++) {
        let cpf = gerarCPF();
        let caminhoImagem = gerarImagemFuncionario(cpf, PASTA_IMAGENS);  // Gera imagem do funcionário

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
            Foto: caminhoImagem  // Adiciona o caminho da foto ao funcionário
        });
    }

    return funcionarios;
}

// Cria um arquivo Excel na pasta especificada
function criarArquivoExcel(funcionarios, PASTA_SAIDA) {
    const ws = xlsx.utils.json_to_sheet(funcionarios);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, "Funcionarios");

    const caminhoArquivo = path.join(PASTA_SAIDA, "funcionarios.xlsx");
    xlsx.writeFile(wb, caminhoArquivo);
    console.log(`📂 Arquivo salvo em: ${caminhoArquivo}`);
}

// Perguntar ao usuário quantos funcionários deseja criar
async function iniciar() {
    const { PASTA_SAIDA, PASTA_IMAGENS } = await obterDiretorios();

    rl.question("Quantos funcionários deseja gerar? ", (quantidade) => {
        const funcionarios = gerarFuncionarios(parseInt(quantidade), PASTA_IMAGENS);
        criarArquivoExcel(funcionarios, PASTA_SAIDA);
        console.log(`📸 Imagens salvas em: ${PASTA_IMAGENS}`);
        rl.close();
    });
}

iniciar();
