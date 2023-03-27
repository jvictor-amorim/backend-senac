# Projeto transformação digital 💻

``` Escopo backend:```

Criação de CRUD's:

📌  CRUD para Usuários


## 📋 Pré-requisitos

📌 Criação de CRUD's
📌 Autenticação do usuário
📌 JWT
📌 Popular o banco de dados
📌 Swagger

-----------------------------------------------------------------

## ⏯ Inicializando o Sistema

#### npm i
###### Instalar as dependências do projeto 
###### __________________________________________________________________________________
#### npm i -g @nestjs/cli
###### Caso não tenha o nest instalado globalmente
###### __________________________________________________________________________________
#### npm i @nestjs/passport @nestjs/jwt bcrypt class-validator class-transformer passport passport-jwt passport-local
###### Instalar as bibliotecas referentes à segurança e autenticação.
###### __________________________________________________________________________________
#### npm install --save @nestjs/swagger swagger-ui-express
###### Instalar as dependências do Swagger
###### __________________________________________________________________________________
#### npm run start:dev
###### Execução do backend
###### __________________________________________________________________________________
#### npx prisma studio
###### Visualização do banco de maneira dinâmica

-----------------------------------------------------------------

## ✅    Swagger

Acesse: http://localhost:8000/swagger

-----------------------------------------------------------------

## 👨‍💻 Modos de Acesso

#### Aplicação terá quatro modos de acesso

```Admin``` <br/>
Acesso: admin@admin.com <br/>
senha: Adm001 <br/>

```Senac``` <br/>
Acesso: senac@example.com <br/>
senha: Senac001 <br/>

```Enterprise``` <br/>
Acesso: enterprise@example.com <br/>
senha: Enterprise001 <br/>

```User``` <br/>
Acesso: user@example.com <br/>
senha: User001 <br/>

-----------------------------------------------------------------

### 🙍‍♂️ CRUD Usuários

```1. Get User By Id ``` <br/>

Este método retorna um usuário pelo seu ID.

```2. Get all Users ``` <br/>

Este método retorna uma lista com todos os usuários cadastrados.

```3. Get User By email``` <br/>

Este método retorna um usuário através do seu email.

```4. Post User``` <br/>

Este método realiza o cadastro de um novo usuário.

```5. Patch User``` <br/>

Este método possibilita a edição de um cadastro de usuário, levando como parâmetro o Id cadastrado no sistema.

```6. Delete User``` <br/>

Este método possibilita deletar o cadastro de um usuário.

-----------------------------------------------------------------

## 🖥️ Tecnologias

IDE: Visual Studio Code

TypeScript <br/>
NodeJS <br/>
Prisma <br/>
JWT <br/>
NestJS <br/>
Swagger <br/>
PostgreSQL <br/>
bcrypt