import { FastifyInstance, FastifyRequest } from "fastify";
import { Equipament } from "../entities/Equipament";
import { addEquipamentController } from "../useCases/AddEquipament";
import { removeEquipamentController } from "../useCases/RemoveEquipament";
import { listEquipamentsController } from "../useCases/ListAllEquipaments";
import { updateEquipamentController } from "../useCases/UpdateEquipament";
import { AdminAuth } from "../middlewares/AdminAuth";
import { ImageUpload } from "../middlewares/ImageUpload";
import fs from "fs";
import util from "util";
import { pipeline } from "stream";
import path from "path";

const pump = util.promisify(pipeline);

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
      const { image } = request.params;
      const filePath = path.join(__dirname, "../uploads", image);

      const leitura = fs.readFileSync(filePath);
      const format = image.split(".")[1];

      reply.type(`image/${format}`).send(leitura);
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
