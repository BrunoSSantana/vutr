import { FastifyReply, FastifyRequest } from "fastify";

import { IBuildListUsersUseCase } from "@/domains/users/usecases";
import { IListUsersValidation } from "@/domains/users/validation/types";
import { IUserRepository } from "@/domains/users/repositories";

export const listUsersController =
  (
    listUserRepository: IUserRepository,
    buildListUsersUseCase: IBuildListUsersUseCase,
    listUsersValidation: IListUsersValidation
  ) =>
  async (request: FastifyRequest, reply: FastifyReply) => {    
    const params = listUsersValidation().validate(
      request.query
    );
    try {

    const user = await buildListUsersUseCase(listUserRepository)(params);

    return reply.status(201).send(user);
    } catch (error) {
      console.log(error);
      
      return reply.status(400).send({ error });
    }
  };
