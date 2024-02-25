import { GraphQLError } from "graphql";
import { FastifyReply, FastifyRequest } from "fastify";
import { ContextAuth } from "@/infra/graphql/apollo-server";
import { AuthenticateUseCase } from "@/domains/users/usecases/authenticate-usecase";

export type AuthenticationApollo = (req: FastifyRequest, res: FastifyReply) => Promise<ContextAuth>;

type AuthenticationApolloBuilder = (
  authenticateUseCase: AuthenticateUseCase
) => AuthenticationApollo;

export const authenticationApolloBuilder: AuthenticationApolloBuilder =
  (authenticateUseCase) => async (req, _) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new GraphQLError("Without token on request", {
        extensions: {
          code: "UNAUTHENTICATED",
          http: { status: 401 },
        },
      });
    }

    try {
      const user = await authenticateUseCase({ token });

      return {
        user,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new GraphQLError("User is not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
      }

      throw new GraphQLError("User is not authenticated", {
        extensions: {
          code: "UNAUTHENTICATED",
          http: { status: 401 },
        },
      });
    }
  };
