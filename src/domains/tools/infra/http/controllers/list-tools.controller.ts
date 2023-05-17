import { FastifyReply, FastifyRequest } from "fastify";
import { BuildListToolUseCase } from "@/domains/tools/core/use-cases";
import { IToolRepository } from "@/domains/tools/core/repositories";
import { IListToolValidationBuild } from "@/domains/tools/core/validation";

export const listToolController =
  (
    listToolRepository: IToolRepository,
    buildListToolUseCase: BuildListToolUseCase,
    listToolValidation: IListToolValidationBuild
  ) =>
  async (request: FastifyRequest, reply: FastifyReply) => {
    const { limit, page, search } = listToolValidation().validate(
      request.query
    );

    const tool = await buildListToolUseCase(listToolRepository)({
      limit,
      page,
      search,
    });

    return reply.status(201).send(tool);
  };
