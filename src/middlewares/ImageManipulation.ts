import fs from "fs";
import util from "util";
import { pipeline } from "stream";
import path from "path";
import { FastifyReply, FastifyRequest } from "fastify";

const pump = util.promisify(pipeline);

export const ImageUpload = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const data = await request.files();
  const listUrl: string[] = [];

  for await (const file of data) {
    const format =
      Date.now().toString() +
      "_" +
      file.filename.replace(/ /g, "_").toLowerCase();
    const filePath = path.join(__dirname, "../uploads", format);
    const storedFile = fs.createWriteStream("src/uploads/" + format);
    await pump(file.file, storedFile);
    listUrl.push(filePath);
  }
  return listUrl;
};

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
