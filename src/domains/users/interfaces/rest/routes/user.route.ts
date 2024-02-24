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

const createUserHandler = createUserControllerFactory();
const listUsersHandler = listUsersControllerFactory();
const updateUserHandler = updateUserControllerFactory();
const deleteUserHandler = deleteUserControllerFactory();

const options = { onRequest: [authenticationFirebaseWithFastify] };

export async function usersRoutes(app: FastifyInstance) {
  app.post<CreateUserRequest>("/user", createUserHandler);
  app.get<ListUsersRequest>("/user", options, listUsersHandler);
  app.put<UpdateUserRequest>("/user", options, updateUserHandler);
  app.delete<DeleteUserRequest>("/user/:userId", options, deleteUserHandler);
}
