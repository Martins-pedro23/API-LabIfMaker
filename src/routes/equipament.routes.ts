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
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

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
    preHandler: AdminAuth as any,
    handler: async (request: FastifyRequest, reply) => {
      const data = await request.files();
      console.log(data);
      const listUrl: string[] = [];

      for await (const file of data) {
        const format =
          Date.now().toString() +
          "_" +
          file.filename.replace(/ /g, "_").toLowerCase();
        const filePath = path.join(__dirname, "../uploads", format);
        const storedFile = fs.createWriteStream("src/uploads/" + format);
        await pump(file.file, storedFile);

        await cloudinary.v2.uploader.upload(
          filePath,
          { public_id: format },
          (error, result) => {
            if (error) {
              reply.code(500).send({ error: error });
            }
            fs.unlinkSync(filePath);
            if (result) {
              listUrl.push(result.secure_url);
            }
          }
        );
      }
      reply.code(200).send({ url: listUrl });
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
