import { FastifyReply, FastifyRequest } from "fastify";

import { IBuildCreateUserUseCase } from "@/domains/users/usecases";
import { ICreateUserValidation } from "@/domains/users/validation/types";
import { IUserRepository } from "@/domains/users/repositories";

export const createUserController =
  (
    createUserRepository: IUserRepository,
    buildCreateUserUseCase: IBuildCreateUserUseCase,
    createUserValidation: ICreateUserValidation
  ) =>
  async (request: FastifyRequest, reply: FastifyReply) => {    
    const params = createUserValidation().validate(
      request.body
    );
    try {

    const user = await buildCreateUserUseCase(createUserRepository)(params);

    return reply.status(201).send(user);
    } catch (error) {
      console.log(error);
      
      return reply.status(400).send({ error });
    }
  };
