import Fastify from "fastify";
import { usersRoutes } from "./routes/users";
import { applicationsRoutes } from "./routes/application";
import fastifyJwt from "@fastify/jwt";
import { loginRoutes } from "./routes/login";

const fastify = Fastify({ logger: true });

fastify.decorate("authenticate", async function (request: any, reply: any) {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.status(401).send({ error: "Token inválido ou ausente" });
  }
});

fastify.register(fastifyJwt, {
  secret: "md5secret",
});

fastify.register(loginRoutes);
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
