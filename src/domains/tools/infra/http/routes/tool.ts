import { FastifyInstance } from "fastify";
import { createToolControllerFactory } from "@/domains/tools/infra/factories";

export async function toolsRoutes(app: FastifyInstance) {
  app.post("/tool", createToolControllerFactory());
}