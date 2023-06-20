import { AuthenticateUseCase } from "@/domains/users/usecases/authenticate.usecase";
import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";

export type AuthentificationFastify = (request: FastifyRequest, reply: FastifyReply, next: HookHandlerDoneFunction) => Promise<void>;

type AuthentificationFastifyBuilder = (authenticateUseCase: AuthenticateUseCase) => AuthentificationFastify;

export const authentificationBuilder: AuthentificationFastifyBuilder =
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
        return reply.status(403).send({ message: "Forbidden", error });
      }

    };