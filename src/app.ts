import Fastify from "fastify";

const fastify = Fastify();
import { db } from "./db/connection";

fastify.get("/users", async (request, reply) => {
  try {
    reply.send({ status: "Servidor e banco funcionando!" });
  } catch (error) {
    reply.status(500).send({ error: "Erro ao conectar ao banco de dados" });
  }
});

fastify
  .listen({ port: 3000 })
  .then(() => {
    console.log("Servidor rodando na porta 3000");
  })
  .catch((err) => {
    console.error("Erro ao iniciar o servidor:", err);
    process.exit(1);
  });
