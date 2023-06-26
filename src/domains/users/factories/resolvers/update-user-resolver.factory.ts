import { PrismaUserRepository } from "@/domains/users/repositories/implementations/prisma";
import { buildUpdateUserValidation } from "@/domains/users/validation/implementations/zod";
import { updateUserUseCaseBuild } from "@/domains/users/usecases/update-user.usecase";
import { updateUserResolver } from "@/domains/users/interfaces/graphql/resolvers";

export const updateUserResolverFactory = () => {
  const prismaUserRepository = new PrismaUserRepository();

  return updateUserResolver(
    prismaUserRepository,
    updateUserUseCaseBuild,
    buildUpdateUserValidation
  );
};
