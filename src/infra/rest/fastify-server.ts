import Fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import { ZodError } from "zod";
import fastifyApollo from "@as-integrations/fastify";

import { toolsRoutes } from "@/domains/tools/interfaces/rest/routes";
import { usersRoutes } from "@/domains/users/interfaces/rest/routes";
import { apolloServer } from "@/infra/graphql/apollo-server";
import { contextAuth } from "@/domains/tools/factories/midllewares/firebase-authentication-apollo-factory";

export const app: FastifyInstance = Fastify();

export const bootServers = async (appInstance: FastifyInstance) => {
  const PORT = Number(process.env.PORT) || 3000;

  appInstance.register(toolsRoutes);
  appInstance.register(usersRoutes);
  appInstance.register(fastifyApollo(apolloServer), {
    context: contextAuth,
  });

  appInstance.setErrorHandler(
    (error: Error, _req: FastifyRequest, reply: FastifyReply) => {
      if (error instanceof ZodError) {
        return reply
          .status(400)
          .send({ message: "Validation error.", issues: error.format() });
      }

      return reply.status(500).send({ message: error.message });
    }
  );

  await appInstance.listen({ host: "0.0.0.0", port: PORT });

  console.log(`🚀 Server ready at http://localhost:${PORT}`);
  console.log(`🚀 GraphQL ready at http://localhost:${PORT}/graphql`);
};
