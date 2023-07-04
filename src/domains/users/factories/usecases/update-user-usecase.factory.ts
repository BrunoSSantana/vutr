import { PrismaUserRepository } from "@/domains/users/repositories/implementations/prisma";
import { updateUserUseCaseBuild } from "@/domains/users/usecases/update-user.usecase";

export const makeUpdateUserUseCase = () => {

  const prismaUserRepository = new PrismaUserRepository()

  return updateUserUseCaseBuild(
    prismaUserRepository
  )
}
