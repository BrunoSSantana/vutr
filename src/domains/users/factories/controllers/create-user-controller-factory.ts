import { FirebaseAuthenticatorGateway } from "@/domains/users/gateways/implementation/firebase";
import { buildCreateUserValidation } from "@/domains/users/validation/implementations/zod";
import { PrismaUserRepository } from "@/domains/users/repositories/implementations/prisma";
import { createUserController } from "@/domains/users/interfaces/rest/controllers";
import { createUserUseCaseBuild } from "@/domains/users/usecases";

export const createUserControllerFactory = () => {
  const prismaUserRepository = new PrismaUserRepository();
  return createUserController(
    FirebaseAuthenticatorGateway,
    prismaUserRepository,
    createUserUseCaseBuild,
    buildCreateUserValidation
  );
};
