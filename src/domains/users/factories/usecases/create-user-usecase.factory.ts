import { PrismaUserRepository } from "@/domains/users/repositories/implementations/prisma";
import { createUserUseCaseBuild } from "@/domains/users/usecases";

export const makeCreateUserUseCase = () => {

  const prismaUserRepository = new PrismaUserRepository()

  return createUserUseCaseBuild(
    prismaUserRepository
  )
}
