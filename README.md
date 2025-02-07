# Gerador de Funcionários Fictícios

Este projeto é responsável por gerar um arquivo Excel contendo dados fictícios de funcionários e imagens aleatórias associadas a cada um deles. O código utiliza o Node.js e bibliotecas como `xlsx`, `canvas`, e `readline` para criar e salvar esses arquivos de maneira dinâmica.

## Funcionalidades

- **Criação de um arquivo Excel** contendo os seguintes dados de funcionários:

  - **Nome**: Nome fictício do funcionário.
  - **Identificador**: Identificador único do funcionário.
  - **N_Folha**: Número da folha do funcionário.
  - **PIS**: Número do PIS gerado aleatoriamente.
  - **CPF**: Número de CPF gerado aleatoriamente.
  - **Empresa**: CNPJ da empresa.
  - **Horário**: Número de horário de trabalho.
  - **Função**: Função atribuída ao funcionário (selecionada aleatoriamente de uma lista pré-definida).
  - **Departamento**: Departamento do funcionário (selecionado aleatoriamente de uma lista pré-definida).
  - **Admissão**: Data de admissão aleatória entre os anos de 2010 e 2024.
  - **Foto**: Caminho da foto gerada para o funcionário, onde o título da foto será o CPF.

- **Função e Departamento**: Ambos são escolhidos aleatoriamente de listas pré-definidas no código.
- **Imagens**: Para cada funcionário, uma foto aleatória é gerada com o CPF do funcionário como título do arquivo. A foto é salva no diretório especificado.
- **Diretórios de salvamento**: O programa pergunta ao usuário onde deseja salvar o arquivo Excel e as fotos. Caso não seja fornecido um caminho, os diretórios padrão são:
  - Excel: `C:\Arquivos`
  - Fotos: `C:\Arquivos\fotos`
- **Criação automática de pastas**: Se os diretórios fornecidos não existirem, o script irá criá-los automaticamente.

## Como Usar

1. **Instalar dependências**: Certifique-se de que o Node.js esteja instalado. No terminal, execute o comando a seguir para instalar as dependências:

   ```bash
   npm install
   ```
