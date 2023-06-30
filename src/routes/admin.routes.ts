import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { addAdminController } from "../useCases/AddAdmin";
import { AddAdminDTO } from "../useCases/AddAdmin/AddAdminDTO";
import { ILoginAdminDTO } from "../useCases/LoginAdmin/LoginAdminDTO";
import { loginAdminController } from "../useCases/LoginAdmin";

export const AdminRoutes = async (fastify: FastifyInstance) => {
  fastify.post("/admin", (request: FastifyRequest<{Body: AddAdminDTO}>, reply: FastifyReply) => {
    return addAdminController.handle(request, reply);
  });

  fastify.post("/admin/login", (request: FastifyRequest<{Body: ILoginAdminDTO}>, reply: FastifyReply) => {
    return loginAdminController.handle(request, reply);
  }
  );
};
