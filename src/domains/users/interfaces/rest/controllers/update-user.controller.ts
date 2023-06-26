import { FastifyReply, FastifyRequest } from "fastify";

import { IBuildUpdateUserUseCase } from "@/domains/users/usecases";
import { IUpdateUserValidation } from "@/domains/users/validation/types";
import { IUserRepository } from "@/domains/users/repositories";

export const updateUserController =
  (
    updateUserRepository: IUserRepository,
    buildUpdateUserUseCase: IBuildUpdateUserUseCase,
    updateUserValidation: IUpdateUserValidation
  ) =>
    async (request: FastifyRequest, reply: FastifyReply) => {
      const userUpdateDTO: Record<string, unknown> = {
        userId: request.user?.id,
        ...(request.body as Record<string, unknown>)
      }

      const params = updateUserValidation().validate(
        userUpdateDTO
      );

      try {

        const user = await buildUpdateUserUseCase(updateUserRepository)(params);

        return reply.status(201).send(user);
      } catch (error) {
        console.log(error);

        return reply.status(400).send({ error });
      }
    };
