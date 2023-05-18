import { readFileSync } from "fs";

import { InMemoryToolRepository } from "@/domains/tools/infra/repositories";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServer } from "@apollo/server";

const typeDefs = readFileSync("./src/infra/graphql/schema.graphql", {
  encoding: "utf-8",
});

const resolvers = {
  Query: {
    tools: (_parent, args, _contextValue, _info) => {
      const { limit, page, search } = args;

      return InMemoryToolRepository.list({ limit, page, search });
    },
  },

  Mutation: {
    tool: (_parent, args, _contextValue, _info) => {
      const { title, link, description, tags } = args;

      return InMemoryToolRepository.create({
        title,
        link,
        description,
        tags,
      });
    },

    deleteTool: (_parent, args, _contextValue, _info) => {
      const { id } = args;

      InMemoryToolRepository.delete(id);

      return true;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
