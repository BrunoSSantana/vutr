import { FastifyReply, FastifyRequest } from "fastify";

import { IBuildCreateToolUseCase } from "@/domains/tools/usecases";
import { ICreateToolValidation } from "@/domains/tools/validation/types";
import { IToolRepository } from "@/domains/tools/repositories";

export const createToolController =
  (
    createToolRepository: IToolRepository,
    buildCreateToolUseCase: IBuildCreateToolUseCase,
    createToolValidation: ICreateToolValidation
  ) =>
  async (request: FastifyRequest, reply: FastifyReply) => {    
    const { title, description, link } = createToolValidation().validate(
      request.body
    );

    const tool = await buildCreateToolUseCase(createToolRepository)({
      title,
      description,
      link,
    });

    return reply.status(201).send(tool);
  };
