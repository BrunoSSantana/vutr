import { PrismaUserRepository } from "@/domains/users/repositories/implementations/prisma";
import { listUsersUseCaseBuild } from "@/domains/users/usecases";

export const makeListUsersUseCase = () => {
  const prismaUserRepository = new PrismaUserRepository();

  return listUsersUseCaseBuild(
    prismaUserRepository
  )
}