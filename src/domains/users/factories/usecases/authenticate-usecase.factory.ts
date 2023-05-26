import { FirebaseAuthenticatorGateway } from "../../gateways/implementation/firebase/firebase-authenticate.gateway";
import { InMemoryUserRepository } from "../../repositories/implementations/in-memory/in-memory-user.user.repository";
import { authenticateUseCaseBuild } from "../../usecases/authenticate.usecase";

export const makeAuthenticateUseCase = () => authenticateUseCaseBuild(
  FirebaseAuthenticatorGateway,
  InMemoryUserRepository,
)