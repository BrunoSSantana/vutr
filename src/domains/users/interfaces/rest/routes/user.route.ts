import { FastifyInstance } from "fastify";

import { authentificationFirebaseWithFastify } from "@/domains/tools/factories/midllewares";
import {
  CreateUserRequest,
  ListUsersRequest,
  UpdateUserRequest,
  DeleteUserRequest
} from "@/domains/users/interfaces/rest/controllers";
import {
  createUserControllerFactory,
  deleteUserControllerFactory,
  updateUserControllerFactory,
  listUsersControllerFactory,
} from "@/domains/users/factories/controllers";

export async function usersRoutes(app: FastifyInstance) {
  app.post<CreateUserRequest>("/user", createUserControllerFactory());
  app.get<ListUsersRequest>("/user", { onRequest: [authentificationFirebaseWithFastify] }, listUsersControllerFactory());
  app.put<UpdateUserRequest>("/user", { onRequest: [authentificationFirebaseWithFastify] }, updateUserControllerFactory());
  app.delete<DeleteUserRequest>("/user/:userId", { onRequest: [authentificationFirebaseWithFastify] }, deleteUserControllerFactory());
}
