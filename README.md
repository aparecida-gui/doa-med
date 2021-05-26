<p align="center">
  <a>
    <img width="400" src="logo-doaMed.png">
  </a>
</p>
<h1 align="center">DoaMed</h1>
</br>
</br>

---

## Problema

Apos a finalização de um tratamento medico é natural sobrar algum medicamento, que normalmente ficam esquecidos nas nossas gavetas e são lembrados apenas apos o seu vencimento. O medicamento que sobra para alguns pode fazer falta para outros.

## Solução

Conectar quem precisa, com quem tem em casa e quer doar. Mas como?
A imagem abaixo apresenta fluxo simples da aplicação e tem o intuito de mostrar o problema e a soluçao de forma simplificada.

<a>
  <img width="1000" src="fluxo-simples-doaMed.png">
</a>

## Status do Projeto

Em desenvolvimento

## Demonstração da aplicação - em ajuste

## Pré-requisitos

Você precisa ter instalado em seu computador as seguintes ferramentas para poder executar o projeto local: [git](https://git-scm.com/downloads), [node.js](https://nodejs.org/en/download/)

## Para executar o projeto local siga os passos abaixo.

1. Clone o repositório `git clone` + url do repositório
2. Execute o comando no terminal `npm install` para instalar as dependencias do projeto
3. Para criar o banco de dados execute o comando `npx sequelize db:create`
4. Para criar as tabelas no banco de dados execute o comando `npm run dev`
5. Crie um arquivo `.env` na raíz do seu projeto e adicione as variaveis de ambiente`JWT_SECRET` e `JWT_EXPIRES`.
6. Para rodar o frontend navegue ate a sua pasta com o comando `cd src/front-end` e execute o comando `npm start`.
7. Para rodar o backend entre na pasta raíz do projeto e execute `npm run dev`.
8. Para enviar e-mails é utilizado [API Sendgrid](https://sendgrid.com/), para utiliza-la você precisa fazer o cadastro no site. Fazer integração com a API do Sendgrid veja os passos [aqui](https://github.com/sendgrid/sendgrid-nodejs/tree/main/packages/mail). Criar um arquivo `.env` adicionar a variavel de ambiente `SENDGRID_API_KEY` que é fornecida pela API e a variavel `YOUR_TEMPLATE_ID_BENEFICIARY` é o id do templante dinamico. Para mais informações sobre a integração com templantes dinamicos veja [aqui](https://sendgrid.com/docs/api-reference/).

## Tecnologias utilizadas

- Node
- React
- Sequelize
- bcrypt
- JWT
- Material-ui
- Jest
- Supertest

## Porque a escolhidas por essas tecnologias?

Essas tecnologias foram escolhidas em primeiro lugar pelo decisão em desenvolver uma aplicação web, em segundo lugar foram analisado fatores como: curva de aprendizado ser baixa, terem uma ótima documentação, uma comunidade grande e bem difundida e por serem tecnologias com atualizações recorrentes.
