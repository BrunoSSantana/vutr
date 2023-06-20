import { IncomingMessage, ServerResponse } from "http";
import { readFileSync } from "fs";

import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServer } from "@apollo/server";

import { resolvers } from "./resolvers";

type ParamsContext = {
  req: IncomingMessage;
  res: ServerResponse<IncomingMessage>;
};

async function  context (params:ParamsContext) {
  const { req, res } = params;

  return {
    req,
    res,
  }
};

const typeDefs = readFileSync("./src/infra/graphql/schema.graphql", {
  encoding: "utf-8",
});

const server = new ApolloServer({
  typeDefs,
  resolvers: resolvers,
});

export const apolloGQLServerStart = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context,
  });
  console.log(`🚀 API GRAPHQL Running in ${url}`);
};
