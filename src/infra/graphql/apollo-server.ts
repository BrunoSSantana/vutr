import { readFileSync } from "fs";

import { InMemoryToolRepository } from "@/domains/tools/infra/repositories";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServer } from "@apollo/server";
import { tools } from "@/domains/tools/infra/http/resolvers/list-tools.resolver";
import { tool } from "@/domains/tools/infra/http/resolvers/create-tool.resolver";
import { deleteTool } from "@/domains/tools/infra/http/resolvers/delete-tool.resolver";

const typeDefs = readFileSync("./src/infra/graphql/schema.graphql", {
  encoding: "utf-8",
});

const resolvers = {
  Query: {
    tools,
  },

  Mutation: {
    tool,
    deleteTool,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export const gqlServerStart = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`🚀  Server ready at: ${url}`);
};
