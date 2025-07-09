const interfaceUsuario = require('./src/interface.js');
const geradorDados = require('./src/services/geradorDados.service.js');
const imagemService = require('./src/services/imagem.service.js');
const arquivoService = require('./src/services/arquivo.service.js');

async function executar() {
  try {
    console.log('🏁 Iniciando o Gerador de Dados de Funcionários...');

    const { quantidade, formato, caminhoSaida, caminhoImagens } = await interfaceUsuario.obterEntradasDoUsuario();
    const funcionarios = geradorDados.gerar(quantidade);
    console.log(`\n✅ ${quantidade} registro(s) de funcionário(s) gerado(s).`);

    await imagemService.baixarImagens(funcionarios, caminhoImagens);
    console.log('✅ Avatares baixados com sucesso.');

    await arquivoService.salvar(funcionarios, formato, caminhoSaida);
    console.log(`\n🚀 Processo concluído! Arquivo ${formato.toUpperCase()} gerado com sucesso.`);
  } catch (erro) {
    console.error(`\n❌ Erro crítico na execução: ${erro.message}`);
  }
}

executar();
