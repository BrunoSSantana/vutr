import { FastifyInstance } from "fastify";

import { authenticationFirebaseWithFastify } from "@/domains/tools/factories/midllewares";
import {
  CreateUserRequest,
  ListUsersRequest,
  UpdateUserRequest,
  DeleteUserRequest,
} from "@/domains/users/interfaces/rest/controllers";
import {
  createUserControllerFactory,
  deleteUserControllerFactory,
  updateUserControllerFactory,
  listUsersControllerFactory,
} from "@/domains/users/factories/controllers";

export async function usersRoutes(app: FastifyInstance) {
  app.post<CreateUserRequest>("/user", createUserControllerFactory());
  app.get<ListUsersRequest>(
    "/user",
    { onRequest: [authenticationFirebaseWithFastify] },
    listUsersControllerFactory()
  );
  app.put<UpdateUserRequest>(
    "/user",
    { onRequest: [authenticationFirebaseWithFastify] },
    updateUserControllerFactory()
  );
  app.delete<DeleteUserRequest>(
    "/user/:userId",
    { onRequest: [authenticationFirebaseWithFastify] },
    deleteUserControllerFactory()
  );
}
