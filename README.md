# Gerador de Funcionários Fictícios

Este projeto foi desenvolvido para gerar dados fictícios de funcionários e criar um arquivo Excel contendo essas informações. O código também gera imagens aleatórias associadas a cada funcionário e as salva em um diretório especificado.

## Funcionalidades

- Geração de dados fictícios de funcionários, incluindo:
  - Nome, Identificador, Número de Folha, PIS, CPF, Empresa, Horário, Função, Departamento e Data de Admissão.
- Geração de imagens aleatórias para cada funcionário, que são salvas em um diretório especificado.
- Criação de um arquivo Excel com as informações dos funcionários.
- Pergunta ao usuário os diretórios para salvar o arquivo Excel e as imagens, com valores padrão:
  - Excel: `C:\Arquivos`
  - Fotos: `C:\Arquivos\fotos`
- Caso as pastas não existam, elas são criadas automaticamente.

## Requisitos

- Node.js v12 ou superior.
- Pacotes npm: `fs`, `path`, `xlsx`, `readline`, `canvas`.
- Acesso ao sistema de arquivos para criação e gravação de arquivos Excel e imagens.

## Instalação

1. Clone o repositório ou baixe o código para sua máquina.
2. Instale as dependências necessárias:

```bash
npm install
```
