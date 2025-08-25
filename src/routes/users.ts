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
      const [existing] = await db
        .select()
        .from(users)
        .where(eq(users.email, email));

      if (existing) {
        return reply.status(400).send({ error: "Usuário já cadastrado" });
      }

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

  fastify.put("/users/:id", async (request, reply) => {
    const { id } = request.params as { id: number };
    const { name } = request.body as { name: string };
    try {
      await db.update(users).set({ name }).where(eq(users.id, id));
      const user = await db.select().from(users).where(eq(users.id, id));

      reply.send({ user });
    } catch (error) {
      reply.status(500).send({ error: "Erro ao editar usuário" });
    }
  });

  fastify.delete("/users/:id", async (request, reply) => {
    const { id } = request.params as { id: number };
    try {
      const result = await db.delete(users).where(eq(users.id, id));
      reply.send({ status: "Usuário deletado com sucesso!", result });
    } catch (error) {
      reply.status(500).send({ error: "Erro ao deletar usuário" });
    }
  });

  fastify.get("/users", async (request, reply) => {
    try {
      const allUsers = await db.select().from(users);
      reply.send({ users: allUsers });
    } catch (error) {
      reply.status(500).send({ error: "Erro ao buscar usuário" });
    }
  });

  fastify.get("/users/:id", async (request, reply) => {
    const { id } = request.params as { id: number };
    try {
      const returnUser = await db.select().from(users).where(eq(users.id, id));
      if (returnUser.length === 0) {
        return reply.status(404).send({ error: "Usuário não encontrado" });
      }
      reply.send({ users: returnUser });
    } catch (error) {
      reply.status(500).send({ error: "Erro ao buscar usuário" });
    }
  });
}
