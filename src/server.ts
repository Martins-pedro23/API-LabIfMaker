import { config } from "dotenv";
config();
import { green, cyan, magenta } from "colorette";
import fastify, { FastifyInstance } from "fastify";
import { Routes } from "./routes";
import { connetion } from "./database/connection";

const server: FastifyInstance = fastify({
  logger: false,
});

Routes(server);

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

const start = async () => {
  try {
    await server.listen({ port: port, host: "0.0.0.0" });
    await connetion();

    console.log("🚀 Server listening on port: " + cyan(port));
  } catch (err) {
    server.log.error("Erro", err);
    process.exit(1);
  }
};

start();
