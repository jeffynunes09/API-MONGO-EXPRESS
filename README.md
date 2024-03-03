<h1> API REST - CADASTRO DE USUÁRIOS  </h1>
<br>

<h2> Este foi o projeto que desenvolvi com o auxilio do professor Diego Fernandes no YouTube do Rocketseat</h2>
<p> O projeto consiste em uma API RESt feito em Node JS, express e utilizando o MongoDB Atlas. São 7 operações, sendo uma de cadastro de usuário, outra de autenticação com token, usando JWT. </p>


<h2> Introdução </h2>
O objetivo é criar um sistema para disponibilizar uma lista com as usuários cadastrados no banco de dados. Estes usuários podem cadastrar projetos e cada projeto pode conter tarefas. O sistema faz a verificação dos dados do usuarios, para que ele possa cadatrar seus projetos, e retorna um erro caso o usuário não esteja cadastrado.

## Tecnologias utilizadas
* VS Code
* Node.JS
* NPM
* Express
* Nodemon
* Mongoose
* Dotenv
* MongoDB
* JWt
* Bcrypt
* Bodyparser
* Nodemailer
* Handlebars

## Endpoints

                                                                                                                                                                                   |

| POST   |  /:authenticate   | Cria um token de auteticação para o usuário <br>                              

| POST   |  /:register       | Cadastra usuário no banco de daos <br>                                        

| GET    | /                 | Retorna todos os projetos criados, necessário passar token do usuário. <br>

| GET    | /:project         | Mostra um usuário e seus projetos e tasks <br>

| POST   | /:project:Id      | Cria um novo projeto <br>

| PUT    | /project:id       | Atualiza algum dado do projeto .<br>

| DELETE | /project:id       | Deleta algum  projeto partir do `id` escrito.<br>



## Ferramentas
Na aplicação foi utilizado o <a href="https://nodejs.org/en/download" target="_blank" > Node.JS </a>  na versão 18.14.0 em LTS.

Na aplicação foi utilizado o <a href="https://www.mongodb.com/pt-br/atlas" target="_blanl" > MongoDB Atlas </a> na nuvem AWS.



## Dependências 
  
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.20.2",
    "dotenv": "^16.4.5",
    "express": "^4.18.2",
    "express-handlebars": "^7.1.2",
    "fs": "^0.0.1-security",
    "hbs": "^4.2.0",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.1.3",
    "nodemailer": "^6.9.10",
    "nodemailer-express-handlebars": "^6.1.2",
    "nodemon": "^3.1.0",
    "path": "^0.12.7"
   


## Rodando o projeto
- Para rodar o repositório na sua máquina, é necessário clonar o mesmo.
  
- Pra rodar o servidor escreva no terminal:

 npm src/index.js

- Parar de rodar o servidor: no terminal clicar nas teclas de "Ctrl" e "C".

- Caminho da URL para o banco de dados:
```
http://localhost:/5081
```




## Modelagem dos dados

Dados que o projeto possui:

| Descrição : USER     | Tipo |
| -------------------- | ------------------ |
| name                  | String   |
| email                 | String   |
| password              | String   |
| passwordResetToken:   | String   |
| passwordResetExpires  | String   |
| createdAt:            | Date     |




| Descrição : PROJECT     | Tipo |
| -------------------- | ------------------ |
| user                  | Schema   |
| title                 | String   |
| description           | String   |
| tasks                 | Schema   |
| createdAt:            | Date     |




| Descrição : PROJECT     | Tipo |
| -------------------- | ------------------ |
| title                 | String   |
| project               | String   |
| assignedTo            | Schema   |
| completed             | Booleam  |
| createdAt:            | Date     |




## Status do projeto
:heavy_check_mark: Aplicação finalizada.
