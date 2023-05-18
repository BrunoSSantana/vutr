import Fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import { ZodError } from "zod";
import { toolsRoutes } from "@/domains/tools/infra/http/routes";

const PORT = Number(process.env.PORT) || 3000;

export const app: FastifyInstance = Fastify({});

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
  await app.listen({ host: "0.0.0.0", port: PORT });
  console.log(`🚀 API REST Running in http://localhost:${PORT}/`);
};
