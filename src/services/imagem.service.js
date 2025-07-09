const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { URL_AVATAR } = require('../../config.js'); // Caminho Corrigido

async function baixarImagem(idUnico, caminhoSalvar) {
  try {
    const url = `${URL_AVATAR}?u=${idUnico}`;
    const resposta = await axios({
      url,
      method: 'GET',
      responseType: 'stream',
    });
    const writer = fs.createWriteStream(caminhoSalvar);
    resposta.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  } catch (erro) {
    console.warn(`Aviso: Falha ao baixar imagem. ${erro.message}`);
  }
}

async function baixarImagens(funcionarios, caminhoImagens) {
  if (!fs.existsSync(caminhoImagens)) {
    fs.mkdirSync(caminhoImagens, { recursive: true });
  }

  console.log('\n📥 Baixando avatares...');
  const promessasDownloads = funcionarios.map((func) => {
    const nomeArquivo = `${func.cpfSemFormatacao}.jpg`;
    const caminhoCompleto = path.join(caminhoImagens, nomeArquivo);
    return baixarImagem(func.idUnico, caminhoCompleto);
  });

  await Promise.all(promessasDownloads);
}

module.exports = { baixarImagens };
