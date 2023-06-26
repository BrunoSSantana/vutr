import { FastifyReply, FastifyRequest } from "fastify";

import { IBuildDeleteUserUseCase } from "@/domains/users/usecases";
import { IDeleteUserValidation } from "@/domains/users/validation/types";
import { IUserRepository } from "@/domains/users/repositories";

export const deleteUserController =
  (
    deleteUserRepository: IUserRepository,
    buildDeleteUserUseCase: IBuildDeleteUserUseCase,
    deleteUserValidation: IDeleteUserValidation
  ) =>
    async (request: FastifyRequest, reply: FastifyReply) => {
      const userDeleteDTO = {
        userId: request.user?.id,
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
