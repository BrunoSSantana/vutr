import { FastifyReply, FastifyRequest } from "fastify";
import { CreateToolUseCase } from "@/domains/tools/core/use-cases";
import { ToolRepository } from "@/domains/tools/core/repositories";
import { CreateToolValidation } from "@/domains/tools/core/validation";

export const createToolController =
  (
    createToolRepository: ToolRepository,
    createToolUseCase: CreateToolUseCase,
    createToolValidation: CreateToolValidation
  ) =>
  async (request: FastifyRequest, reply: FastifyReply) => {
    const { title, description, link, tags } = createToolValidation().validate(
      request.body
    );

    const tool = await createToolUseCase(createToolRepository)({
      title,
      description,
      link,
      tags,
    });

    return reply.status(201).send(tool);
  };
