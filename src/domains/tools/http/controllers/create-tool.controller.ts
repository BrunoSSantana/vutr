import { FastifyReply, FastifyRequest } from "fastify";

import { IBuildCreateToolUseCase } from "@/domains/tools/core/use-cases";
import { ICreateToolValidation } from "@/domains/tools/core/validation";
import { IToolRepository } from "@/domains/tools/core/repositories";

export const createToolController =
  (
    createToolRepository: IToolRepository,
    buildCreateToolUseCase: IBuildCreateToolUseCase,
    createToolValidation: ICreateToolValidation
  ) =>
  async (request: FastifyRequest, reply: FastifyReply) => {
    const { title, description, link, tags } = createToolValidation().validate(
      request.body
    );

    const tool = await buildCreateToolUseCase(createToolRepository)({
      title,
      description,
      link,
      tags,
    });

    return reply.status(201).send(tool);
  };
