import { GraphQLResolveInfo } from "graphql";
import { IncomingMessage, ServerResponse } from "http";
import {
  listToolResolverFactory,
  createToolResolverFactory,
  deleteToolResolverFactory,
} from "@/domains/tools/factories/resolvers";

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
    tools: listToolResolverFactory(),
  },

  Mutation: {
    tool: createToolResolverFactory(),
    deleteTool: deleteToolResolverFactory(),
    // createUser: (parent: User, args: CreateUserDTO, contextValue: Context, info: GraphQLResolveInfo) => { },
  },
};
