import { buildCreateUserValidation } from "@/domains/users/validation/implementations/zod";
import { PrismaUserRepository } from "@/domains/users/repositories/implementations/prisma";
import { createUserUseCaseBuild } from "@/domains/users/usecases";
import { createUserController } from "@/domains/users/interfaces/rest/controllers";

export const createUserControllerFactory = () => {
  const prismaUserRepository = new PrismaUserRepository();
  return createUserController(
    prismaUserRepository,
    createUserUseCaseBuild,
    buildCreateUserValidation
  );
};
