import { AuthenticateUseCase } from "@/domains/users/usecases/authenticate-usecase";
import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";

export type AuthenticationFastify = (request: FastifyRequest, reply: FastifyReply, next: HookHandlerDoneFunction) => Promise<void>;

type AuthenticationFastifyBuilder = (authenticateUseCase: AuthenticateUseCase) => AuthenticationFastify;

export const authenticationBuilder: AuthenticationFastifyBuilder =
  (authenticateUseCase) =>
    async (request, reply, next) => {

      const token = request.headers.authorization?.split(" ")[1];

      if (!token) {
        return reply.status(401).send({ message: "Unauthorized" });
      }

      try {
        const user = await authenticateUseCase({ token });

        request.user = user;

        next();
      }
      catch (error) {

        if (error instanceof Error) {
          return reply.status(403).send({ message: "Forbidden", error: error.message });
        }

        return reply.status(403).send({ message: "Forbidden" });

      }

    };