import { makeAuthenticateUseCase } from "@/domains/users/factories/usecases/authenticate-usecase.factory";
import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";

export const authentification = async (request: FastifyRequest, reply: FastifyReply, next: HookHandlerDoneFunction) => {

  const token = request.headers.authorization?.split(" ")[1];

  if (!token) {
    return reply.status(401).send({ message: "Unauthorized" });
  }

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    const user = await authenticateUseCase({ token });

    request.user = user;
 

    next();
  }
  catch (error) {
    return reply.status(403).send({ message: "Forbidden" });
  }

};