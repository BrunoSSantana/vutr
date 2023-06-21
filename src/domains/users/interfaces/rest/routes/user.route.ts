import { FastifyInstance } from "fastify";

import { authentificationFirebaseWithFastify } from "@/domains/tools/factories/midllewares";
import { createUserControllerFactory } from "@/domains/users/factories/controllers/create-user-controller-factory";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/user", { onRequest: [authentificationFirebaseWithFastify] }, createUserControllerFactory);
}
