import { FastifyReply, FastifyRequest } from "fastify";

import { UpdateUserRequest } from "@/domains/users/interfaces/rest/controllers";
import { IUpdateUserValidation } from "@/domains/users/validation/types";
import { IBuildUpdateUserUseCase } from "@/domains/users/usecases";
import { IUserRepository } from "@/domains/users/repositories";
import { UpdateUserDTO } from "@/domains/users/entities";

type BodyUpdateUser = Omit<UpdateUserDTO, 'id'>;

export const updateUserController =
  (
    updateUserRepository: IUserRepository,
    buildUpdateUserUseCase: IBuildUpdateUserUseCase,
    updateUserValidation: IUpdateUserValidation
  ) =>
    async (request: FastifyRequest<UpdateUserRequest>, reply: FastifyReply) => {
      const userUpdateDTO: UpdateUserDTO = {
        id: request.user!.id,
        ...request.body,
      }

      const params = updateUserValidation().validate(
        userUpdateDTO
      );

      try {

        const user = await buildUpdateUserUseCase(updateUserRepository)(params);

        return reply.status(201).send(user);
      } catch (error) {
        return reply.status(400).send({ error });
      }
    };
