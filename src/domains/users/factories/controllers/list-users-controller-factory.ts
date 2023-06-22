import { PrismaUserRepository } from "@/domains/users/repositories/implementations/prisma";
import { buildListUsersValidation } from "@/domains/users/validation/implementations/zod";
import { listUsersController } from "@/domains/users/interfaces/rest/controllers";
import { listUsersUseCaseBuild } from "@/domains/users/usecases";

export const listUsersControllerFactory = () => {
  const prismaUserRepository = new PrismaUserRepository();

  return listUsersController(
    prismaUserRepository,
    listUsersUseCaseBuild,
    buildListUsersValidation
  );
};
