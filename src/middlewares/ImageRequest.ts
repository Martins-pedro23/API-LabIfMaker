import fs from "fs";
import util from "util";
import { pipeline } from "stream";
import path from "path";
import { FastifyReply, FastifyRequest } from "fastify";

const pump = util.promisify(pipeline);

export const ImageRequest = async (
  request: FastifyRequest<{ Params: { image: string } }>,
  reply: FastifyReply
) => {
  const { image } = request.params;
  const filePath = path.join(__dirname, "../uploads", image);

  const leitura = fs.readFileSync(filePath);
  const format = image.split(".")[1];

  return { leitura, format };
};
