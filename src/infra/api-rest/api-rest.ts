import Fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import { ZodError } from "zod";
import { toolsRoutes } from "@/domains/tools/infra/http/routes";
import { gqlServer } from "@/infra/graphql/gql-server";

export const app: FastifyInstance = Fastify({});

app.addContentTypeParser("multipart/form-data", {}, (req, payload, done) =>
  done(null)
);

app.register(toolsRoutes);
app.register(gqlServer);

app.setErrorHandler(
  (error: Error, _req: FastifyRequest, reply: FastifyReply) => {
    if (error instanceof ZodError) {
      return reply
        .status(400)
        .send({ message: "Validation error.", issues: error.format() });
    }

    return reply.status(500).send({ message: error.message });
  }
);
