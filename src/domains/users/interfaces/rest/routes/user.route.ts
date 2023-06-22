import { FastifyInstance } from "fastify";

import { createUserControllerFactory, listUsersControllerFactory } from "@/domains/users/factories/controllers";
import { authentificationFirebaseWithFastify } from "@/domains/tools/factories/midllewares";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/user", { onRequest: [authentificationFirebaseWithFastify] }, createUserControllerFactory());
  app.get("/user", { onRequest: [authentificationFirebaseWithFastify] }, listUsersControllerFactory());
}
