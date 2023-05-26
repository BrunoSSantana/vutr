import { FastifyInstance } from "fastify";
import {
  createToolControllerFactory,
  deleteToolControllerFactory,
  listToolControllerFactory,
} from "@/domains/tools/factories/controllers";
import { authentification } from "@/domains/auth/midlleware/firebase-authentication";

export async function toolsRoutes(app: FastifyInstance) {
  app.post("/tool", createToolControllerFactory());
  app.get("/tools", { preHandler: [authentification], onRequest: [authentification] }, listToolControllerFactory());
  app.delete("/tool/:toolId", deleteToolControllerFactory());
}
