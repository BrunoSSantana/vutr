import { deleteUserUseCaseBuild } from "@/domains/users/usecases";
import { deleteUserResolver } from "@/domains/users/interfaces/graphql/resolvers";
import { buildDeleteUserValidation } from "@/domains/users/validation/implementations/zod";
import { PrismaUserRepository } from "@/domains/users/repositories/implementations/prisma";

export const deleteUserResolverFactory = () => {
  const prismaUserRepository = new PrismaUserRepository();

  return deleteUserResolver(
    prismaUserRepository,
    deleteUserUseCaseBuild,
    buildDeleteUserValidation
  );
};
