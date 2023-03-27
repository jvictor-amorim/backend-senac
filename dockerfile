FROM node:16

ENV JWT_SECRET 007 
ENV DATABASE_URL postgres://root:uMamxGi6XNYVqCuDDeYQ4ZdrclWXpwYs@dpg-cg19qrd269vfsnrln1kg-a.oregon-postgres.render.com/db_transformacao_digital_senac

RUN apt-get update

RUN npm i

RUN npm i -g @nestjs/cli

RUN npm i @nestjs/passport @nestjs/jwt bcrypt class-validator class-transformer passport passport-jwt passport-local

RUN npm install --save @nestjs/swagger swagger-ui-express

WORKDIR /home/node/app

COPY package*.json ./

USER root

RUN npm install

COPY --chown=node:node . .