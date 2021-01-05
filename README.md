
<p align="center">
  <a>
    <img width="400" src="logo-doaMed.png">
  </a>
</p>
<h1 align="center">DoaMed</h1>
</br>
</br>

## Problema
Não é um problema apenas no Brasil, mas mundial o desperdicio de medicamentos. São toneladas de medicamentos que poderiam estar salvando vidas, mas estão aindo parar nos lixos das nossas casas.


## Solução
Conectar quem precisa do medicamento com quem tem em casa e quer doa-lo. Mas como?


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

## Porque estas tecnologias foram escolhidas?

Porque a aplicação é web o que facilita o acesso a todos, já que basta ter apenas um navegador web para acessa-la e pela facilidade em poder utilizar apenas uma linguagem no backend e no frontend.
