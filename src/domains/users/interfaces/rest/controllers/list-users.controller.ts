import { FastifyReply, FastifyRequest } from "fastify";

import { ListUsersRequest } from "@/domains/users/interfaces/rest/controllers";
import { IListUsersValidation } from "@/domains/users/validation/types";
import { IBuildListUsersUseCase } from "@/domains/users/usecases";
import { IUserRepository } from "@/domains/users/repositories";

export const listUsersController =
  (
    listUserRepository: IUserRepository,
    buildListUsersUseCase: IBuildListUsersUseCase,
    listUsersValidation: IListUsersValidation
  ) =>
  async (request: FastifyRequest<ListUsersRequest>, reply: FastifyReply) => {
    const listUsersDTO = request.query;

    const params = listUsersValidation().validate(listUsersDTO);
    try {
      const user = await buildListUsersUseCase(listUserRepository)(params);

      return reply.status(201).send(user);
    } catch (error) {
      return reply.status(400).send({ error });
    }
  };
