import { FastifyInstance } from "fastify";
import {
  createToolControllerFactory,
  deleteToolControllerFactory,
  listToolControllerFactory,
} from "@/domains/tools/factories/controllers";

export async function toolsRoutes(app: FastifyInstance) {
  app.post("/tool", createToolControllerFactory());
  app.get("/tools", listToolControllerFactory());
  app.delete("/tool/:toolId", deleteToolControllerFactory());
}
