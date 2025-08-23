import Fastify from "fastify";
import { usersRoutes } from "./routes/users";
import { applicationsRoutes } from "./routes/application";

const fastify = Fastify({ logger: true });

fastify.register(usersRoutes);
fastify.register(applicationsRoutes);

fastify.register(require("@fastify/formbody"));
fastify.register(require("@fastify/ajv-compiler"));

fastify
  .listen({ port: 3000 })
  .then(() => {
    console.log("Servidor rodando na porta 3000");
  })
  .catch((err) => {
    console.error("Erro ao iniciar o servidor:", err);
    process.exit(1);
  });
