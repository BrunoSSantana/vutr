import { FastifyInstance } from "fastify";
import {
  createToolControllerFactory,
  listToolControllerFactory,
} from "@/domains/tools/infra/factories";

export async function toolsRoutes(app: FastifyInstance) {
  app.post("/tool", createToolControllerFactory());
  app.get("/tools", listToolControllerFactory());
}
