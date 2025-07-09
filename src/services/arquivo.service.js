const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

function _prepararDadosParaSaida(funcionarios) {
  const camposExportacao = ['Nome', 'Identificador', 'N_Folha', 'PIS', 'CPF', 'Empresa', 'Horário', 'Função', 'Departamento', 'Admissão', 'Estrutura'];

  return funcionarios.map((func) => {
    const funcionarioExportacao = {};
    for (const campo of camposExportacao) {
      funcionarioExportacao[campo] = func[campo] || '';
    }
    return funcionarioExportacao;
  });
}

function _salvarComoExcel(dados, caminhoSaida) {
  const planilha = xlsx.utils.json_to_sheet(dados);
  const livro = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(livro, planilha, 'Funcionarios');
  const caminhoArquivo = path.join(caminhoSaida, 'funcionarios.xlsx');
  xlsx.writeFile(livro, caminhoArquivo);
}

function _salvarComoCSV(dados, caminhoSaida) {
  const cabecalho = Object.keys(dados[0]).join(',');
  const linhas = dados
    .map((func) =>
      Object.values(func)
        .map((v) => `"${v}"`)
        .join(',')
    )
    .join('\n');
  const conteudo = `${cabecalho}\n${linhas}`;
  const caminhoArquivo = path.join(caminhoSaida, 'funcionarios.csv');
  fs.writeFileSync(caminhoArquivo, conteudo);
}

function _salvarComoPRN(dadosParaSalvar, caminhoSaida) {
  const definicoesLargura = {
    Nome: 30,
    Identificador: 12,
    N_Folha: 8,
    PIS: 12,
    CPF: 15,
    Empresa: 20,
    Horário: 15,
    Função: 15,
    Departamento: 15,
    Admissão: 12,
    Estrutura: 20,
  };

  const cabecalho = Object.keys(definicoesLargura)
    .map((key) => key.padEnd(definicoesLargura[key]))
    .join('');

  const linhas = dadosParaSalvar
    .map((func) => {
      return Object.keys(definicoesLargura)
        .map((key) => String(func[key]).padEnd(definicoesLargura[key]))
        .join('');
    })
    .join('\n');

  const conteudo = `${cabecalho}\n${linhas}`;
  const caminhoArquivo = path.join(caminhoSaida, 'funcionarios.prn');
  fs.writeFileSync(caminhoArquivo, conteudo);
}

async function salvar(funcionarios, formato, caminhoSaida) {
  if (!fs.existsSync(caminhoSaida)) {
    fs.mkdirSync(caminhoSaida, { recursive: true });
  }

  const dadosParaSalvar = _prepararDadosParaSaida(funcionarios);
  console.log(`\n💾 Salvando arquivo no formato ${formato.toUpperCase()}...`);

  switch (formato) {
    case 'excel':
      _salvarComoExcel(dadosParaSalvar, caminhoSaida);
      break;
    case 'csv':
      _salvarComoCSV(dadosParaSalvar, caminhoSaida);
      break;
    case 'prn':
      _salvarComoPRN(dadosParaSalvar, caminhoSaida);
      break;
    default:
      throw new Error(`Formato de arquivo desconhecido: ${formato}`);
  }
}

module.exports = { salvar };
