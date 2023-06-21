import { PrismaUserRepository } from "@/domains/users/repositories/implementations/prisma";
import { buildCreateUserValidation } from "@/domains/users/validation/implementations/zod";
import { createUserUseCaseBuild } from "@/domains/users/usecases/create-user.usecase";
import { createUserResolver } from "@/domains/users/interfaces/graphql/resolvers";

export const createUserResolverFactory = () => {
  const prismaUserRepository = new PrismaUserRepository();

  return createUserResolver(
    prismaUserRepository,
    createUserUseCaseBuild,
    buildCreateUserValidation
  );
};
