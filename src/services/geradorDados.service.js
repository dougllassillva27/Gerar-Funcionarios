const { faker } = require('@faker-js/faker');
const { formatarCPF } = require('../utils/formatadores.js'); // Caminho Corrigido
const { FUNCOES, DEPARTAMENTOS, CNPJ_EMPRESA } = require('../../config.js'); // Caminho Corrigido

function gerar(quantidade) {
  const funcionarios = [];
  faker.locale = 'pt_BR';
  for (let i = 0; i < quantidade; i++) {
    const cpfSemFormatacao = faker.string.numeric(11);

    funcionarios.push({
      idUnico: i + 1,
      cpfSemFormatacao: cpfSemFormatacao,
      Nome: faker.person.fullName(),
      Identificador: faker.string.alphanumeric(10).toUpperCase(),
      N_Folha: faker.number.int({ min: 1, max: 999 }),
      PIS: faker.string.numeric(11),
      CPF: formatarCPF(cpfSemFormatacao),
      Empresa: CNPJ_EMPRESA,
      Horário: '08:00 às 18:00',
      Função: faker.helpers.arrayElement(FUNCOES),
      Departamento: faker.helpers.arrayElement(DEPARTAMENTOS),
      Admissão: faker.date.past({ years: 5 }).toLocaleDateString('pt-BR'),
      Estrutura: '',
    });
  }
  return funcionarios;
}

module.exports = { gerar };
