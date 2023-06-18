import { authentificationBuilder } from "@/domains/auth/midlleware/firebase-authentication";
import { makeAuthenticateUseCase } from "@/domains/users/factories/usecases/authenticate-usecase.factory";

export const authentificationFirebaseWithFastify = authentificationBuilder(
  makeAuthenticateUseCase()
);