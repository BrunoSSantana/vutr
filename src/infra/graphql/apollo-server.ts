import { readFileSync } from "fs";
import { ApolloServer } from "@apollo/server";
import fastify, { FastifyInstance } from "fastify";
import { fastifyApolloDrainPlugin } from "@as-integrations/fastify";

import { User } from "@/domains/users/entities";
import { resolvers } from "@/infra/graphql/resolvers";

export const app: FastifyInstance = fastify();

export type ContextAuth = {
  user: User;
};

const typeDefs = readFileSync("./src/infra/graphql/schema.graphql", {
  encoding: "utf-8",
});

export const apolloServer = new ApolloServer<ContextAuth>({
  typeDefs,
  resolvers: resolvers,
  plugins: [fastifyApolloDrainPlugin(app)],
});

await apolloServer.start();
