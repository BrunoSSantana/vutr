import { FastifyInstance } from "fastify";

import {
  listToolControllerFactory,
  createToolControllerFactory,
  deleteToolControllerFactory,
} from "@/domains/tools/factories/controllers";
import { authenticationFirebaseWithFastify } from "@/domains/tools/factories/midllewares";

export async function toolsRoutes(app: FastifyInstance) {
  app.post(
    "/tool",
    { onRequest: [authenticationFirebaseWithFastify] },
    createToolControllerFactory()
  );
  app.get(
    "/tools",
    { onRequest: [authenticationFirebaseWithFastify] },
    listToolControllerFactory()
  );
  app.delete(
    "/tool/:toolId",
    { onRequest: [authenticationFirebaseWithFastify] },
    deleteToolControllerFactory()
  );
}
