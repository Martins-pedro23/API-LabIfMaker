import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { addAdminController } from "../useCases/AddAdmin";
import { AddAdminDTO } from "../useCases/AddAdmin/AddAdminDTO";
import { ILoginAdminDTO } from "../useCases/LoginAdmin/LoginAdminDTO";
import { loginAdminController } from "../useCases/LoginAdmin";
import { AdminAuth } from "../middlewares/AdminAuth";

export const AdminRoutes = async (fastify: FastifyInstance) => {
  fastify.route({
    method: "POST",
    url: "/admin",
    handler: (request: FastifyRequest<{Body: AddAdminDTO}>, reply: FastifyReply) => {
      return addAdminController.handle(request, reply);
    },
    preHandler: AdminAuth as any,
  })

  fastify.post("/admin/login", (request: FastifyRequest<{Body: ILoginAdminDTO}>, reply: FastifyReply) => {
    return loginAdminController.handle(request, reply);
  }
  );
};
