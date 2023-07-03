import { config } from "dotenv";
config();
import { green, cyan, magenta } from "colorette";
import fastify, { FastifyInstance } from "fastify";
import { ApolloServer, BaseContext } from "@apollo/server";
import fastifyApollo, { fastifyApolloDrainPlugin } from "@as-integrations/fastify";
import { Routes } from "./routes";
import  typeDefs  from "./typeDefs";
import resolvers from "./resolvers";
import { connetion } from "./database/connection";

const server: FastifyInstance = fastify({
  logger: false,
});

const apollo = new ApolloServer<BaseContext>({
  typeDefs,
  resolvers,
  plugins: [fastifyApolloDrainPlugin(server)],
});

async () => {
  await apollo.start();
  await server.register(fastifyApollo(apollo));

}


Routes(server);

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

const start = async () => {
  try {
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
