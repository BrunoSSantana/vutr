import { PrismaUserRepository } from "@/domains/users/repositories/implementations/prisma";
import { createUserUseCaseBuild } from "@/domains/users/usecases/create-user.usecase";

export const makeCreateUserUseCase = () => {

  const prismaUserRepository = new PrismaUserRepository()

  return createUserUseCaseBuild(
    prismaUserRepository
  )
}