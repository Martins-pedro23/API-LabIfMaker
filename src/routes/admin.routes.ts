import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { addAdminController } from "../useCases/AddAdmin";
import { ILoginAdminDTO } from "../useCases/LoginAdmin/LoginAdminDTO";
import { loginAdminController } from "../useCases/LoginAdmin";
import { AdminAuth } from "../middlewares/AdminAuth";
import { Admin } from "../entities/Admin";

export const AdminRoutes = async (fastify: FastifyInstance) => {
  fastify.route({
    method: "POST",
    url: "/admin",
    handler: (request: FastifyRequest<{Body: Admin}>, reply: FastifyReply) => {
      return addAdminController.handle(request, reply);
    },
    preHandler: AdminAuth as any,
  })

  fastify.post("/admin/login", (request: FastifyRequest<{Body: ILoginAdminDTO}>, reply: FastifyReply) => {
    return loginAdminController.handle(request, reply);
  }
  );
};
