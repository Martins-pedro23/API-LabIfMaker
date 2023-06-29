import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { addAdminController } from "../useCases/AddAdmin";
import { AddAdminDTO } from "../useCases/AddAdmin/AddAdminDTO";

export const AdminRoutes = async (fastify: FastifyInstance) => {
  fastify.post("/admin", (request: FastifyRequest<{Body: AddAdminDTO}>, reply: FastifyReply) => {
    return addAdminController.handle(request, reply);
  });
};
