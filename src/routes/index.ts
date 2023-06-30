import { FastifyInstance, RouteHandler } from "fastify";
import { AdminRoutes } from "./admin.routes";
import { EquipamentRoutes } from "./equipament.routes";

export async function Routes(fastify: FastifyInstance) {
  fastify.register(AdminRoutes);
  fastify.register(EquipamentRoutes)

  fastify.get("/health", async (request, reply) => {
    return { message: "API OK!!" };
  });
}
