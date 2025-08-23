import { FastifyInstance } from "fastify";
import { db } from "../db/connection";
import { users } from "../db/schema/users";
import { eq } from "drizzle-orm";

export async function usersRoutes(fastify: FastifyInstance) {
  fastify.post("/users", async (request, reply) => {
    const { name, email, password } = request.body as {
      name: string;
      email: string;
      password: string;
    };
    try {
      await db.insert(users).values({ name, email, password });
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, email));
      reply.status(201).send({ user });
    } catch (error) {
      reply.status(500).send({ error: "Erro ao criar usuário" });
    }
  });

  fastify.get("/users", async (request, reply) => {
    try {
      reply.send({ status: "Servidor e banco funcionando!" });
    } catch (error) {
      reply.status(500).send({ error: "Erro ao conectar ao banco de dados" });
    }
  });
}
