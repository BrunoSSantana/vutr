import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify";
import { createToolControllerFactory } from "./domains/tools/factories";
import { ZodError } from "zod";

export const app: FastifyInstance = Fastify({});

app.post("/tool", createToolControllerFactory());

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error.", issues: error.format() });
  }

  return reply.status(500).send({ message: "Internal server error." });
});
