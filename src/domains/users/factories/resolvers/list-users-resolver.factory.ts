import { PrismaUserRepository } from "@/domains/users/repositories/implementations/prisma";
import { buildListUsersValidation } from "@/domains/users/validation/implementations/zod";
import { listUsersResolver } from "@/domains/users/interfaces/graphql/resolvers";
import { listUsersUseCaseBuild } from "@/domains/users/usecases";

export const listUsersResolverFactory = () => {
  const prismaUserRepository = new PrismaUserRepository();

  return listUsersResolver(
    prismaUserRepository,
    listUsersUseCaseBuild,
    buildListUsersValidation
  );
};
