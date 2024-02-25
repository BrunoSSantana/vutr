import { makeAuthenticateUseCase } from "@/domains/users/factories/usecases/authenticate-usecase.factory";
import { authenticationBuilder } from "@/infra/rest/middleware/firebase-fastify-authentication";

export const authenticationFirebaseWithFastify = authenticationBuilder(
  makeAuthenticateUseCase()
);