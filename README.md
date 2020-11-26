## DoaMed

O objetivo da aplicação é chegar o medicamento ate quem mais precisa e não tem condições de comprar. 

## Status do Projeto

Em desenvolvimento

## Demonstração da aplicação - em ajuste

Infelizmente muita coisa que funciona local não funciona no heroku, mas se você quiser visualizar acesse: https://doa-med.herokuapp.com/

## Pré-requisitos

Você precisa ter instalado em seu computador as seguintes ferramentas para poder executar o projeto local:

[git](https://git-scm.com/downloads), [node.js](https://nodejs.org/en/download/)

## Para executar o projeto local siga os passos abaixo.

1. Clone o repositório `git clone` + url do repositório
2. Execute o comando no terminal `npm install` para instalar as dependencias do projeto
3. Para criar o banco de dados execute o comando `npx sequelize db:create`
4. Para criar as tabelas no banco de dados execute o comando `npm run dev`
5. Crie um arquivo .env na raíz do seu projeto e adicione as variaveis de ambiente`JWT_SECRET` e `JWT_EXPIRES`.

## Tecnologias utilizadas

- Node
- React
- Sequelize
- bcrypt
- JWT
- Material-ui

## Porque estas tecnologias foram escolhidas?

Porque a aplicação é web o que facilita o acesso a todos, já que basta ter apenas um navegador web para acessa-la e pela facilidade em poder utilizar apenas uma linguagem no backend e no frontend.
