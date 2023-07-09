import { FastifyInstance, FastifyRequest } from "fastify";
import { Equipament } from "../entities/Equipament";
import { addEquipamentController } from "../useCases/AddEquipament";
import { removeEquipamentController } from "../useCases/RemoveEquipament";
import { listEquipamentsController } from "../useCases/ListAllEquipaments";
import { updateEquipamentController } from "../useCases/UpdateEquipament";
import { AdminAuth } from "../middlewares/AdminAuth";
import { ImageUpload } from "../middlewares/ImageUpload";
import { ImageRequest } from "../middlewares/ImageRequest";


export const EquipamentRoutes = async (fastify: FastifyInstance) => {
  fastify.route({
    method: "POST",
    url: "/equipament",
    preHandler: AdminAuth as any,
    handler: async (request: FastifyRequest<{ Body: Equipament }>, reply) => {
      return addEquipamentController.handle(request, reply);
    },
  });

  fastify.route({
    method: "POST",
    url: "/equipament/image",
    //preHandler: AdminAuth as any,
    handler: async (request: FastifyRequest, reply) => {
      const listUrl = await ImageUpload(request, reply);
      reply.code(200).send({ url: listUrl });
    },
  });

  fastify.route({
    method: "GET",
    url: "/equipament/image/:image",
    //preHandler: AdminAuth as any,
    handler: async (
      request: FastifyRequest<{ Params: { image: string } }>,
      reply
    ) => {
      const image = await ImageRequest(request, reply);

      reply.type(`image/${image.format}`).send(image.leitura);
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

  fastify.route({
    method: "PUT",
    url: "/equipament",
    preHandler: AdminAuth as any,
    handler: (request: FastifyRequest<{ Body: Equipament }>, reply) => {
      return updateEquipamentController.handle(request, reply);
    },
  });
};
