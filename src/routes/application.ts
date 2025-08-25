import { FastifyInstance } from "fastify";
import { db } from "../db/connection";
import { users } from "../db/schema/users";
import { eq } from "drizzle-orm";
import { application } from "../db/schema/application";

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>;
  }
}

export async function applicationsRoutes(fastify: FastifyInstance) {
  fastify.decorate("authenticate", async function (request: any, reply: any) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.status(401).send({ error: "Token inválido ou ausente" });
    }
  });

  fastify.post(
    "/application",
    {
      preHandler: [fastify.authenticate],
    },
    async (request, reply) => {
      const { numeroSerie, modelo, fabricante } = request.body as {
        numeroSerie: string;
        modelo: string;
        fabricante: string;
      };
      try {
        const [existing] = await db
          .select()
          .from(application)
          .where(eq(application.numeroSerie, numeroSerie));
        if (existing) {
          return reply
            .status(400)
            .send({ error: "Número de série já cadastrado" });
        }

        await db
          .insert(application)
          .values({ numeroSerie, modelo, fabricante });
        const [applications] = await db
          .select()
          .from(application)
          .where(eq(application.numeroSerie, numeroSerie));
        reply.status(201).send({ applications });
      } catch (error) {
        reply.status(500).send({ error: "Erro ao criar Aplicação" });
      }
    }
  );

  fastify.put(
    "/application/:id",
    {
      preHandler: [fastify.authenticate],
    },
    async (request, reply) => {
      const { id } = request.params as { id: number };
      const { numeroSerie, modelo, fabricante } = request.body as {
        numeroSerie: string;
        modelo: string;
        fabricante: string;
      };
      try {
        await db
          .update(application)
          .set({ numeroSerie, modelo, fabricante })
          .where(eq(application.id, id));
        const [updated] = await db
          .select()
          .from(application)
          .where(eq(application.id, id));
        reply.status(201).send({ application: updated });
      } catch (error) {
        reply.status(500).send({ error: "Erro ao alterar aplicação" });
      }
    }
  );

  fastify.delete(
    "/application",
    {
      preHandler: [fastify.authenticate],
    },
    async (request, reply) => {
      const { id } = request.params as { id: number };
      try {
        const result = await db
          .delete(application)
          .where(eq(application.id, id));
        reply.send({ status: "Aplicação deletada com sucesso!", result });
      } catch (error) {
        reply.status(500).send({ error: "Erro ao deletar aplicação" });
      }
    }
  );

  fastify.get(
    "/application",
    {
      preHandler: [fastify.authenticate],
    },
    async (request, reply) => {
      try {
        const allApplications = await db.select().from(application);
        reply.send({ applications: allApplications });
      } catch (error) {
        reply.status(500).send({ error: "Erro ao retornar aplicação" });
      }
    }
  );

  fastify.get(
    "/application/:id",
    {
      preHandler: [fastify.authenticate],
    },
    async (request, reply) => {
      const { id } = request.params as { id: number };
      try {
        const [returnApplication] = await db
          .select()
          .from(application)
          .where(eq(application.id, id));
        if (!returnApplication) {
          return reply.status(404).send({ error: "Aplicação não encontrada" });
        }
        reply.send({ applications: returnApplication });
      } catch (error) {
        reply.status(500).send({ error: "Erro ao retornar aplicação" });
      }
    }
  );
}
