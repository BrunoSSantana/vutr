import {
  createToolResolverFactory,
  listToolResolverFactory,
  deleteToolResolverFactory,
} from "@/domains/tools/infra/factories/resolvers";

export const resolvers = {
  Query: {
    tools: listToolResolverFactory(),
  },

  Mutation: {
    tool: createToolResolverFactory(),
    deleteTool: deleteToolResolverFactory(),
  },
};
