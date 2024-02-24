import { FastifyInstance } from "fastify";

import {
  listToolControllerFactory,
  createToolControllerFactory,
  deleteToolControllerFactory,
} from "@/domains/tools/factories/controllers";
import { authenticationFirebaseWithFastify } from "@/domains/tools/factories/midllewares";

const createToolHandler = createToolControllerFactory();
const listToolHandler = listToolControllerFactory();
const deleteToolHandler = deleteToolControllerFactory();

const options = { onRequest: [authenticationFirebaseWithFastify] };

export async function toolsRoutes(app: FastifyInstance) {
  app.post("/tool", options, createToolHandler);
  app.get("/tools", options, listToolHandler);
  app.delete("/tool/:toolId", options, deleteToolHandler);
}
