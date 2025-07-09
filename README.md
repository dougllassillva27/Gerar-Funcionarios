# 📖 Gerador de Dados Fictícios

Uma aplicação de linha de comando (CLI) desenvolvida em **Node.js** para gerar massas de dados de funcionários fictícios. O projeto é altamente configurável, permitindo ao usuário definir a **quantidade de dados**, o **formato do arquivo de saída** e os **diretórios de salvamento**.

---

## ✨ Funcionalidades Principais

- **Geração Interativa**  
  O script guia o usuário por meio de perguntas no terminal.

- **Múltiplos Formatos de Saída**  
  Exportação para `.xlsx` (Excel), `.csv` e `.prn` (texto de largura fixa).

- **Dados Abrangentes**  
  Gera os seguintes dados para cada funcionário:

  - Nome
  - Identificador
  - N_Folha
  - PIS
  - CPF
  - Empresa
  - Horário
  - Função
  - Departamento
  - Admissão
  - Estrutura

- **Avatares Personalizados**  
  Baixa uma imagem de avatar única para cada funcionário, salvando como `<CPF>.png`.

- **Caminhos Customizáveis**  
  Permite definir onde os arquivos serão salvos (`C:\Arquivos` é o padrão).

- **Criação Automática de Pastas**  
  Pastas de destino são criadas automaticamente se não existirem.

---

## 🚀 Tecnologias Utilizadas

- **Node.js** — Ambiente de execução JavaScript
- **@faker-js/faker** — Geração de dados fictícios
- **Axios** — Cliente HTTP para download de avatares
- **ExcelJS** — Criação de planilhas Excel
- **pkg** — Empacotamento da aplicação em `.exe`
- **rcedit** — Edição de recursos `.exe` (ícone, versão, etc.)

---

## 📂 Estrutura do Projeto

```bash
/gerador-funcionarios/
│
├── dist/                  # Executável gerado (.exe)
├── assets/                # Ícone da aplicação (icon.ico)
├── src/                   # Código-fonte principal
│   ├── services/          # Lógica de geração e salvamento de dados
│   ├── utils/             # Funções auxiliares (ex: formatadores)
│   └── interface.js       # Interface CLI (perguntas ao usuário)
│
├── config.js              # Configurações globais
├── index.js               # Ponto de entrada da aplicação
├── package.json           # Scripts, dependências, metadata
└── README.md              # Documentação do projeto
```

---

## 🛠️ Pré-requisitos

Para desenvolvimento ou personalização:

- **Node.js** (v18 ou superior)
- **npm** (vem com o Node.js)

---

## ⚙️ Instalação

```bash
# Clone o repositório
git clone <URL_DO_REPOSITORIO>

# Acesse a pasta
cd gerador-funcionarios

# Instale as dependências
npm install
```

---

## ▶️ Como Usar (Modo de Desenvolvimento)

Execute o comando abaixo:

```bash
npm start
```

O programa será iniciado no terminal e fará perguntas para geração dos dados.

---

## 📝 Licença

Este projeto está sob a **Licença MIT**. Consulte o arquivo `LICENSE` para mais detalhes.
