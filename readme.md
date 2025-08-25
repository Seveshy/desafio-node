# Desafio Node - Projeto de Estudos Backend

Este projeto foi criado para **exercitar e aprimorar habilidades de desenvolvimento backend** utilizando tecnologias modernas do ecossistema Node.js.  
O objetivo é praticar conceitos como arquitetura de APIs, autenticação, ORM, migrations, rotas protegidas e integração com banco de dados.

## Tecnologias Utilizadas

- **Node.js**  
  Plataforma principal para execução do backend.

- **Fastify**  
  Framework web rápido e eficiente para criação de APIs REST.

- **TypeScript**  
  Tipagem estática para maior segurança e produtividade no desenvolvimento.

- **Drizzle ORM**  
  ORM moderno para manipulação e migração de banco de dados relacional.

- **MySQL**  
  Banco de dados relacional utilizado para persistência dos dados.

- **@fastify/jwt**  
  Plugin para autenticação JWT nas rotas protegidas.

- **@fastify/formbody**  
  Plugin para tratamento de dados enviados via formulários.

- **@fastify/ajv-compiler**  
  Plugin para validação de dados e schemas.

- **dotenv**  
  Gerenciamento de variáveis de ambiente.

- **uuid**  
  Geração de identificadores únicos para entidades.

- **drizzle-kit**  
  Ferramenta para geração e aplicação de migrations com Drizzle ORM.

---

## Objetivo

Este projeto é **exclusivamente para estudos** e serve como base para quem deseja aprender e praticar:

- Estruturação de projetos Node.js com TypeScript
- Criação de rotas RESTful
- Autenticação JWT
- Migrations e manipulação de banco de dados com Drizzle ORM
- Boas práticas de organização de código backend

---

## Como gerar as migrations

1. Gere as migrations com o Drizzle Kit:
   ```
   npm run drizzle:generate
   ```
2. Aplique as migrations no banco de dados:
   ```
   npm run drizzle:push
   ```

---

## Como iniciar o projeto

1. Compile e inicie o servidor:
   ```
   npm start
   ```
2. Ou, para desenvolvimento com atualização automática:
   ```
   npm run dev
   ```

---

\*\*Bons estudos e boa prática de
