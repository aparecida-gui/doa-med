
<p align="center">
  <a>
    <img width="400" src="logo-doaMed.png">
  </a>
</p>
<h1 align="center">DoaMed</h1>
</br>
</br>

## Objetivo do DoaMed

O nosso objetivo é conectar quem precisa de medicamento e quem tem um medicamento guardado em casa que esteja dentro do prazo de validade e queira doa-lo.

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
6. Para enviar e-mails foi utilizado [API Sendgrid](https://sendgrid.com/), para utiliza-la você precisa fazer o cadastro no site. Após faça, a integração com a API do Sendgrid veja os passos [aqui](https://github.com/sendgrid/sendgrid-nodejs/tree/main/packages/mail). No arquivo `.env` adicione a variavel de ambiente `SENDGRID_API_KEY` que é fornecida na integração com API e a variavel `YOUR_TEMPLATE_ID_BENEFICIARY` é o id do templante dinamico que a API oferece mais informações sobre a integração com templantes dinamicos veja [aqui](https://sendgrid.com/docs/api-reference/).

## Tecnologias utilizadas

- Node
- React
- Sequelize
- bcrypt
- JWT
- Material-ui
- Jest
- Supertest

## Porque estas tecnologias foram escolhidas?

Porque a aplicação é web o que facilita o acesso a todos, já que basta ter apenas um navegador web para acessa-la e pela facilidade em poder utilizar apenas uma linguagem no backend e no frontend.
