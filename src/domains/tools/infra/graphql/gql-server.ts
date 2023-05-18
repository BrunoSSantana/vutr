import { app } from "@/app";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { createSchema, createYoga } from "graphql-yoga";

export const graphQLServer = createYoga<{
  req: FastifyRequest;
  reply: FastifyReply;
}>({
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      scalar File

      type Query {
        hello: String
        isFastify: Boolean
      }
      type Mutation {
        hello: String
        getFileName(file: File!): String
      }
      type Subscription {
        countdown(from: Int!, interval: Int!): Int!
      }
    `,
    resolvers: {
      Query: {
        hello: () => "world",
        isFastify: (_, __, context) => !!context.req && !!context.reply,
      },
      Mutation: {
        hello: () => "world",
        getFileName: (root, { file }: { file: File }) => file.name,
      },
      Subscription: {
        countdown: {
          async *subscribe(_, { from, interval }) {
            for (let i = from; i >= 0; i--) {
              await new Promise((resolve) =>
                setTimeout(resolve, interval ?? 1000)
              );
              yield { countdown: i };
            }
          },
        },
      },
    },
  }),
  // Integrate Fastify Logger to Yoga
  logging: {
    debug: (...args) => args.forEach((arg) => app.log.debug(arg)),
    info: (...args) => args.forEach((arg) => app.log.info(arg)),
    warn: (...args) => args.forEach((arg) => app.log.warn(arg)),
    error: (...args) => args.forEach((arg) => app.log.error(arg)),
  },
});

export async function gqlServer(app: FastifyInstance) {
  app.route({
    url: graphQLServer.graphqlEndpoint,
    method: ["GET", "POST", "OPTIONS"],
    handler: async (req, reply) => {
      // Second parameter adds Fastify's `req` and `reply` to the GraphQL Context
      const response = await graphQLServer.handleNodeRequest(req, {
        req,
        reply,
      });
      response.headers.forEach((value, key) => {
        reply.header(key, value);
      });

      reply.status(response.status);

      reply.send(response.body);

      return reply;
    },
  });
}
