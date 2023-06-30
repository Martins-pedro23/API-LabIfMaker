import { FastifyInstance, FastifyRequest } from "fastify";
import { Equipament } from "../entities/Equipament";
import { addEquipamentController } from "../useCases/AddEquipament";
import { AdminAuth } from "../middlewares/AdminAuth";

export const EquipamentRoutes = async (fastify: FastifyInstance) => {
  fastify.route({
    method: "POST",
    url: "/equipament",
    handler: (request: FastifyRequest<{ Body: Equipament }>, reply) => {
      console.log("oi");
      return addEquipamentController.handle(request, reply);
    },
    preHandler: AdminAuth as any,
  });
};
