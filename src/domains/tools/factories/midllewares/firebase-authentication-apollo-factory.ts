import { ApolloFastifyContextFunction } from "@as-integrations/fastify";

import { ContextAuth } from "@/infra/graphql/apollo-server";
import { makeAuthenticateUseCase } from "@/domains/users/factories/usecases";
import { authenticationApolloBuilder } from "@/infra/graphql/firebase-apollo-authentication";

export const contextAuth: ApolloFastifyContextFunction<ContextAuth> =
  authenticationApolloBuilder(makeAuthenticateUseCase());
