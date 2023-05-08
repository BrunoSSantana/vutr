import Fastify, { FastifyInstance } from "fastify";
import { ZodError } from "zod";

import { toolsRoutes } from "@/domains/tools/infra/http/routes";

export const app: FastifyInstance = Fastify({});

app.register(toolsRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error.", issues: error.format() });
  }

  return reply.status(500).send({ message: "Internal server error." });
});
