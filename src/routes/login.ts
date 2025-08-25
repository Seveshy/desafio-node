import { FastifyInstance } from "fastify";
import { db } from "../db/connection";
import { users } from "../db/schema/users";
import { eq } from "drizzle-orm";

export async function loginRoutes(fastify: FastifyInstance) {
  fastify.post("/login", async (request, reply) => {
    const { email, password } = request.body as {
      email: string;
      password: string;
    };
    const [user] = await db.select().from(users).where(eq(users.email, email));
    if (!user || user.password !== password) {
      return reply.status(401).send({ error: "Credenciais inválidas" });
    }
    const token = fastify.jwt.sign({ id: user.id, email: user.email });
    reply.send({ token });
  });
}
