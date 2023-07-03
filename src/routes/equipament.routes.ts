import { FastifyInstance, FastifyRequest } from "fastify";
import { Equipament } from "../entities/Equipament";
import { addEquipamentController } from "../useCases/AddEquipament";
import { removeEquipamentController } from "../useCases/RemoveEquipament";
import { listEquipamentsController } from "../useCases/ListAllEquipaments";
import { updateEquipamentController } from "../useCases/UpdateEquipament";
import { AdminAuth } from "../middlewares/AdminAuth";
import fs from "fs";
import util from "util";
import { pipeline } from "stream";
import path from "path";

const pump = util.promisify(pipeline);

export const EquipamentRoutes = async (fastify: FastifyInstance) => {
  fastify.route({
    method: "POST",
    url: "/equipament",
    //preHandler: AdminAuth as any,
    handler: async (request: FastifyRequest<{ Body: Equipament }>, reply) => {
      const data = await request.files();
      for await (const file of data) {
        const format =
          Date.now().toString() +
          "_" +
          file.filename.replace(/ /g, "_").toLowerCase();
        const storedFile = fs.createWriteStream("src/uploads/" + format);
        await pump(file.file, storedFile);
      }
      return addEquipamentController.handle(request, reply);
    },
  });

  fastify.route({
    method: "GET",
    url: "/equipament/upload/:filename",
    handler: async (
      request: FastifyRequest<{ Params: { filename: string } }>,
      reply
    ) => {
      const { filename } = request.params;

      const imgPath = "src/uploads/" + filename;

      fs.readFile(imgPath, (err, data) => {
        if (err) {
          console.log(err);
          return;
        }

        reply.header("Content-Type", "image/png");
        reply.send("<img src='" + data + "' />");
      });
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
