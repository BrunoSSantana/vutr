import { FastifyReply, FastifyRequest } from "fastify";

import { DeleteUserRequest } from "@/domains/users/interfaces/rest/controllers";
import { IDeleteUserValidation } from "@/domains/users/validation/types";
import { IBuildDeleteUserUseCase } from "@/domains/users/usecases";
import { IUserRepository } from "@/domains/users/repositories";
import { DeleteUserDTO } from "@/domains/users/entities";

export const deleteUserController =
  (
    deleteUserRepository: IUserRepository,
    buildDeleteUserUseCase: IBuildDeleteUserUseCase,
    deleteUserValidation: IDeleteUserValidation
  ) =>
    async (request: FastifyRequest<DeleteUserRequest>, reply: FastifyReply) => {
      const userDeleteDTO: DeleteUserDTO = {
        userId: request.params.userId,
      }

      const params = deleteUserValidation().validate(
        userDeleteDTO
      );

      try {

        await buildDeleteUserUseCase(deleteUserRepository)(params);

        return reply.status(201).send();
      } catch (error) {
        return reply.status(400).send({ error });
      }
    };
