import { FastifyInstance, FastifyRequest } from "fastify";
import { Equipament } from "../entities/Equipament";
import { addEquipamentController } from "../useCases/AddEquipament";
import { removeEquipamentController } from "../useCases/RemoveEquipament";
import { listEquipamentsController } from "../useCases/ListEquipaments";
import { AdminAuth } from "../middlewares/AdminAuth";

export const EquipamentRoutes = async (fastify: FastifyInstance) => {
  fastify.route({
    method: "POST",
    url: "/equipament",
    preHandler: AdminAuth as any,
    handler: (request: FastifyRequest<{ Body: Equipament }>, reply) => {
      return addEquipamentController.handle(request, reply);
    },
  });

  fastify.route({
    method: "GET",
    url: "/equipament",
    preHandler: AdminAuth as any,
    handler: (request: FastifyRequest, reply) => {
      return listEquipamentsController.handle(request, reply);
    },
  });

  fastify.route({
    method: "DELETE",
    url: "/equipament",
    preHandler: AdminAuth as any,
    handler: (request: FastifyRequest<{ Body: { id: string } }>, reply) => {
      return removeEquipamentController.handle(request, reply);
    },
  });
};
