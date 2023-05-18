import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServer } from "@apollo/server";
import { readFileSync } from "fs";

import { resolvers } from "./resolvers";

const typeDefs = readFileSync("./src/infra/graphql/schema.graphql", {
  encoding: "utf-8",
});

const server = new ApolloServer({
  typeDefs,
  resolvers: resolvers,
});

export const gqlServerStart = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`🚀  Server ready at: ${url}`);
};
