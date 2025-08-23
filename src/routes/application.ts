import { FastifyInstance } from "fastify";
import { db } from "../db/connection";
import { users } from "../db/schema/users";
import { eq } from "drizzle-orm";
import { application } from "../db/schema/application";

export async function applicationsRoutes(fastify: FastifyInstance) {
  fastify.post("/application", async (request, reply) => {
    const { numeroSerie, modelo, fabricante } = request.body as {
      numeroSerie: string;
      modelo: string;
      fabricante: string;
    };
    try {
      await db.insert(application).values({ numeroSerie, modelo, fabricante });
      const [applications] = await db
        .select()
        .from(application)
        .where(eq(application.numeroSerie, numeroSerie));
      reply.status(201).send({ applications });
    } catch (error) {
      reply.status(500).send({ error: "Erro ao criar Aplicação" });
    }
  });

  fastify.get("/application", async (request, reply) => {
    try {
      reply.send({ status: "Servidor e banco funcionando!" });
    } catch (error) {
      reply.status(500).send({ error: "Erro ao conectar ao banco de dados" });
    }
  });
}
