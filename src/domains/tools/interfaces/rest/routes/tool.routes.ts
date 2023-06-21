import { FastifyInstance } from "fastify";

import {
  createToolControllerFactory,
  deleteToolControllerFactory,
  listToolControllerFactory,
} from "@/domains/tools/factories/controllers";
import { authentificationFirebaseWithFastify } from "@/domains/tools/factories/midllewares";

export async function toolsRoutes(app: FastifyInstance) {
  app.post("/tool", { onRequest: [authentificationFirebaseWithFastify] }, createToolControllerFactory());
  app.get("/tools", { onRequest: [authentificationFirebaseWithFastify] }, listToolControllerFactory());
  app.delete("/tool/:toolId", { onRequest: [authentificationFirebaseWithFastify] }, deleteToolControllerFactory());
}
