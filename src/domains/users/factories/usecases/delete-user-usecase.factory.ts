import { PrismaUserRepository } from "@/domains/users/repositories/implementations/prisma";
import { deleteUserUseCaseBuild } from "@/domains/users/usecases";

export const makeDeleteUserUseCase = () => {
  const prismaUserRepository = new PrismaUserRepository();

  return deleteUserUseCaseBuild(
    prismaUserRepository
  )
}