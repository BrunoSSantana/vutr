import { FastifyReply, FastifyRequest } from "fastify";
import { BuildListToolUseCase } from "@/domains/tools/usecases";
import { IToolRepository } from "@/domains/tools/repositories";
import { IListToolValidationBuild } from "@/domains/tools/validation/types";

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
