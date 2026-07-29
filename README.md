# api-rest-test

## Objetivo

Projeto de automação de testes para a API REST do repositório [juliodelimas/banco-api](https://github.com/juliodelimas/banco-api.git).
O objetivo é validar endpoints de login e transferência usando JavaScript e bibliotecas de teste modernas.

## Stack utilizada

- Node.js
- JavaScript (CommonJS)
- Mocha
- Chai
- Supertest
- Mochawesome
- dotenv

## Estrutura de diretórios

- `fixtures/` - arquivos JSON com dados de entrada para os testes.
- `helpers/` - funções auxiliares de teste, como autenticação.
- `test/` - casos de teste Mocha para as rotas da API.
- `mochawesome-report/` - relatório HTML gerado pelo Mochawesome após a execução dos testes.
- `.env` - arquivo de variáveis de ambiente usado pelo projeto.
- `package.json` - configurações do projeto, dependências e scripts.
- `package-lock.json` - versão fixa das dependências.
- `server.js` - servidor local do projeto (se existir e for utilizado).

## Arquivo `.env`

Crie um arquivo `.env` na raiz do projeto com a variável abaixo:

```dotenv
BASE_URL="http://localhost:3000"
```

### Observações

- O projeto carrega a URL base da API usando `process.env.BASE_URL`.
- Certifique-se de que a API do repositório `juliodelimas/banco-api` esteja rodando antes de executar os testes.

## Comandos

Instalar dependências:

```bash
npm install
```

Executar os testes:

```bash
npm test
```

Este comando roda o Mocha em todos os arquivos `test/**/*.test.js` com timeout de `200000` e gera um relatório usando o reporter `mochawesome`.

## Relatório de testes

Após a execução, o Mochawesome gera um relatório HTML no diretório:

- `mochawesome-report/mochawesome.html`

Abra esse arquivo no navegador para visualizar o resultado completo dos testes.

## Dependências e documentação

- Mocha: https://mochajs.org/
- Chai: https://www.chaijs.com/
- Supertest: https://www.npmjs.com/package/supertest
- Mochawesome: https://www.npmjs.com/package/mochawesome
- dotenv: https://www.npmjs.com/package/dotenv

## Uso

1. Clone ou baixe este repositório.
2. Crie o arquivo `.env` com a variável `BASE_URL` apontando para a API em teste.
3. Instale as dependências com `npm install`.
4. Execute os testes com `npm test`.
5. Abra `mochawesome-report/mochawesome.html` para ver o relatório.
