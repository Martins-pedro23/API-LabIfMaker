import { config } from "dotenv";
config();
import "reflect-metadata";
import { green, cyan} from "colorette";
import fastify, { FastifyInstance } from "fastify";
import { ApolloServer } from "@apollo/server";
import fastifyApollo, {fastifyApolloDrainPlugin} from "@as-integrations/fastify";
import { Routes } from "./routes";
import { connetion } from "./database/connection";
import { buildSchemasFunction } from "./graphql/index.graphql";
import fastifyMultipart from "@fastify/multipart";

const server: FastifyInstance = fastify({
  logger: false,
});

server.register(fastifyMultipart)

Routes(server);


const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

const start = async () => {
  try {
    const schemas = await buildSchemasFunction();
    const apollo = new ApolloServer({
      schema: schemas,
      plugins: [fastifyApolloDrainPlugin(server)],
    });
    await apollo.start();
    await server.register(fastifyApollo(apollo));
    await server.listen({ port: port, host: "0.0.0.0" });
    await connetion();

    console.log("🚀 Server listening on port: " + cyan(port));
    apollo.logger.info("🌟 ApolloServer is responding: " + green("true"));
  } catch (err) {
    server.log.error("Erro", err);
    process.exit(1);
  }
};

start();
