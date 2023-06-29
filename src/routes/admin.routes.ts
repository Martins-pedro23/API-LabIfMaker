import { FastifyInstance } from "fastify";

export const AdminRoutes = async (fastify: FastifyInstance) => {
  fastify.get("/admin/health", async (request, reply) => {
    return { hello: "Admin API OK!!" };
  });
};
