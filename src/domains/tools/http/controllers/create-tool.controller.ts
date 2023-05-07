import { FastifyReply, FastifyRequest } from "fastify";
import { ToolRepository } from "@/domains/tools/repositories";
import { CreateToolUseCase } from "@/domains/tools/use-cases";
import { CreateToolValidation } from "@/domains/tools/validation";

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
