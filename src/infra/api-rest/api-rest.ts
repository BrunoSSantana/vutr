import Fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import { ZodError } from "zod";
import { toolsRoutes } from "@/domains/tools/infra/http/routes";

export const app: FastifyInstance = Fastify({});

app.addContentTypeParser("multipart/form-data", {}, (req, payload, done) =>
  done(null)
);

app.register(toolsRoutes);

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

export const apiRestStart = async () => {
  await app.listen({ host: "0.0.0.0", port: 3000 });
  console.log("🚀 HTTP Server Running!");
};
