import { FastifyInstance, RouteHandler } from "fastify";
import { AdminRoutes } from "./admin.routes";

export async function Routes(fastify: FastifyInstance) {
  fastify.register(AdminRoutes);

  fastify.get("/health", async (request, reply) => {
    return { message: "API OK!!" };
  });
}
