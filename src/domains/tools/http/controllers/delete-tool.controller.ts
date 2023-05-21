import { FastifyReply, FastifyRequest } from "fastify";

import { IBuildDeleteToolUseCase } from "@/domains/tools/usecases";
import { IDeleteToolValidation } from "@/domains/tools/validation/types";
import { IToolRepository } from "@/domains/tools/repositories";

export const deleteToolController =
  (
    deleteToolRepository: IToolRepository,
    buildDeleteToolUseCase: IBuildDeleteToolUseCase,
    deleteToolValidation: IDeleteToolValidation
  ) =>
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { toolId } = deleteToolValidation().validate(request.params);

      await buildDeleteToolUseCase(deleteToolRepository)({
        toolId,
      });

      return reply.status(204).send();
    };
