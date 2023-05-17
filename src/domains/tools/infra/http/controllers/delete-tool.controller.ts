import { FastifyReply, FastifyRequest } from "fastify";

import { IBuildDeleteToolUseCase } from "@/domains/tools/core/use-cases";
import { IDeleteToolValidation } from "@/domains/tools/core/validation";
import { IToolRepository } from "@/domains/tools/core/repositories";

export const deleteToolController =
  (
    deleteToolRepository: IToolRepository,
    buildDeleteToolUseCase: IBuildDeleteToolUseCase,
    deleteToolValidation: IDeleteToolValidation
  ) =>
  async (request: FastifyRequest, reply: FastifyReply) => {
    console.log({ params: request.params });

    const { toolId } = deleteToolValidation().validate(request.params);

    await buildDeleteToolUseCase(deleteToolRepository)({
      toolId,
    });

    return reply.status(204).send();
  };
