FROM node:18-alpine

WORKDIR /usr/src/app

ENV JWT_SECRET 007 
ENV DATABASE_URL postgres://root:uMamxGi6XNYVqCuDDeYQ4ZdrclWXpwYs@dpg-cg19qrd269vfsnrln1kg-a.oregon-postgres.render.com/db_transformacao_digital_senac

RUN yarn

RUN yarn global add @nestjs/cli

RUN yarn add @nestjs/passport @nestjs/jwt bcrypt class-validator class-transformer passport passport-jwt passport-local

RUN yarn add @nestjs/swagger swagger-ui-express

COPY . .

EXPOSE 8000