import { config } from "dotenv";
import { green, cyan, magenta } from "colorette";
import fastify, { FastifyInstance } from "fastify";
config();

const server: FastifyInstance = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
    },
  },
});

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

const start = async () => {
  try {
    await server.listen({ port: port, host: "0.0.0.0" });
  } catch (err) {
    server.log.error("Erro", err);
    process.exit(1);
  }
};

start();
