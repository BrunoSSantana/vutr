import {
  listToolResolverFactory,
  createToolResolverFactory,
  deleteToolResolverFactory,
} from "@/domains/tools/factories/resolvers";

export const resolvers = {
  Query: {
    tools: listToolResolverFactory(),
  },

  Mutation: {
    tool: createToolResolverFactory(),
    deleteTool: deleteToolResolverFactory(),
  },
};
