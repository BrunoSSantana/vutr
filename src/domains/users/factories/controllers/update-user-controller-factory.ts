import { buildUpdateUserValidation } from "@/domains/users/validation/implementations/zod";
import { PrismaUserRepository } from "@/domains/users/repositories/implementations/prisma";
import { updateUserUseCaseBuild } from "@/domains/users/usecases";
import { updateUserController } from "@/domains/users/interfaces/rest/controllers";

export const updateUserControllerFactory = () => {
  const prismaUserRepository = new PrismaUserRepository();
  return updateUserController(
    prismaUserRepository,
    updateUserUseCaseBuild,
    buildUpdateUserValidation
  );
};
