import { GraphQLResolveInfo } from "graphql";
import { IncomingMessage, ServerResponse } from "http";
import {
  listToolResolverFactory,
  createToolResolverFactory,
  deleteToolResolverFactory,
} from "@/domains/tools/factories/resolvers";
import { createUserResolverFactory } from "@/domains/users/factories/resolvers/create-user-resolver.factory";
import { listUsersResolverFactory } from "@/domains/users/factories/resolvers";

type Context = {
  req: IncomingMessage;
  res: ServerResponse<IncomingMessage>;
}


export type IFieldResolver<
  TSource,
  TArgs,
  TReturn
> = (
  source: TSource,
  args: TArgs,
  context: Context,
  info: GraphQLResolveInfo
) => Promise<TReturn> | TReturn;

export const resolvers = {
  Query: {
    listTools: listToolResolverFactory(),
    listUsers: listUsersResolverFactory(),

  },

  Mutation: {
    createTool: createToolResolverFactory(),
    deleteTool: deleteToolResolverFactory(),
    createUser: createUserResolverFactory(),
  },
};
