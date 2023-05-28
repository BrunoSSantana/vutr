import { FastifyInstance } from "fastify";
import {
  createToolControllerFactory,
  deleteToolControllerFactory,
  listToolControllerFactory,
} from "@/domains/tools/factories/controllers";
import { authentification } from "@/domains/auth/midlleware/firebase-authentication";

export async function toolsRoutes(app: FastifyInstance) {
  app.post("/tool", { onRequest: [authentification] }, createToolControllerFactory());
  app.get("/tools", { onRequest: [authentification] }, listToolControllerFactory());
  app.delete("/tool/:toolId", { onRequest: [authentification] }, deleteToolControllerFactory());
}
