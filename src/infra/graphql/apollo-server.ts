import { ApolloServer } from "@apollo/server";
import fastify, { FastifyInstance } from "fastify";
import { fastifyApolloDrainPlugin } from "@as-integrations/fastify";

import { readFileSync } from "fs";
import { IncomingMessage, ServerResponse } from "http";

import { resolvers } from "@/infra/graphql/resolvers";

export const app: FastifyInstance = fastify();

type ParamsContext = {
  req: IncomingMessage;
  res: ServerResponse<IncomingMessage>;
};

async function context(params: ParamsContext) {
  const { req, res } = params;

  return {
    req,
    res,
  };
}

const typeDefs = readFileSync("./src/infra/graphql/schema.graphql", {
  encoding: "utf-8",
});

export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers: resolvers,
  plugins: [fastifyApolloDrainPlugin(app)],
});

await apolloServer.start()
