import { FirebaseAuthenticatorGateway } from "@/domains/users/gateways/implementation/firebase";
import { PrismaUserRepository } from "@/domains/users/repositories/implementations/prisma";
import { authenticateUseCaseBuild } from "@/domains/users/usecases/authenticate-usecase";

export const makeAuthenticateUseCase = () => {

  const prismaUserRepository = new PrismaUserRepository()

  return authenticateUseCaseBuild(
    FirebaseAuthenticatorGateway,
    prismaUserRepository,
  )
}