import { FastifyReply, FastifyRequest } from "fastify";

import { CreateUserRequest } from "@/domains/users/interfaces/rest/controllers";
import { ICreateUserValidation } from "@/domains/users/validation/types";
import { IAuthenticatorGateway } from "@/domains/users/gateways/types";
import { IBuildCreateUserUseCase } from "@/domains/users/usecases";
import { IUserRepository } from "@/domains/users/repositories";
import { CreateUserDTO } from "@/domains/users/entities";

export const createUserController =
  (
    authenticatorGateway: IAuthenticatorGateway,
    createUserRepository: IUserRepository,
    buildCreateUserUseCase: IBuildCreateUserUseCase,
    createUserValidation: ICreateUserValidation
  ) =>
  async (request: FastifyRequest<CreateUserRequest>, reply: FastifyReply) => {
    try {
      const token = request.headers.authorization?.split(" ")[1];

      if (!token) {
        return reply.status(401).send({ message: "Unauthorized" });
      }

      const { externalId, email } = await authenticatorGateway.authenticate({
        token,
      });

      const createUserDTO: CreateUserDTO = {
        ...request.body,
        externalId,
        email,
      };

      const params = createUserValidation().validate(createUserDTO);

      await buildCreateUserUseCase(createUserRepository)(params);

      return reply.status(201).send();
    } catch (error) {
      if (error instanceof Error) {
        return reply.status(400).send({ message: error.message });
      }

      return reply.status(400).send({ error: "Bad Request" });
    }
  };
