import { FirebaseAuthenticatorGateway } from "@/domains/users/gateways/implementation/firebase/firebase-authenticate.gateway";
import { authenticateUseCaseBuild } from "@/domains/users/usecases/authenticate.usecase";
import { PrismaUserRepository } from "@/domains/users/repositories/implementations/prisma";

export const makeAuthenticateUseCase = () => {

  const prismaUserRepository = new PrismaUserRepository()

  return authenticateUseCaseBuild(
    FirebaseAuthenticatorGateway,
    prismaUserRepository,
  )
}