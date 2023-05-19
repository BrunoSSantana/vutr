import { FastifyInstance } from "fastify";
import {
  deleteToolControllerFactory,
  createToolControllerFactory,
  listToolControllerFactory,
} from "@/domains/tools/infra/factories/controllers";

export async function toolsRoutes(app: FastifyInstance) {
  app.post("/tool", createToolControllerFactory());
  app.get("/tools", listToolControllerFactory());
  app.delete("/tool/:toolId", deleteToolControllerFactory());
}
