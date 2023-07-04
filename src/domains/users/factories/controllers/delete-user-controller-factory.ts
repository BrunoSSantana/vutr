import { buildDeleteUserValidation } from "@/domains/users/validation/implementations/zod";
import { PrismaUserRepository } from "@/domains/users/repositories/implementations/prisma";
import { deleteUserUseCaseBuild } from "@/domains/users/usecases";
import { deleteUserController } from "@/domains/users/interfaces/rest/controllers";

export const deleteUserControllerFactory = () => {
  const prismaUserRepository = new PrismaUserRepository();
  return deleteUserController(
    prismaUserRepository,
    deleteUserUseCaseBuild,
    buildDeleteUserValidation
  );
};
