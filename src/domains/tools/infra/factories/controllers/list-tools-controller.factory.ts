import { listToolUseCase } from "@/domains/tools/core/use-cases/list-tools.use-case";
import { buildListToolValidation } from "@/domains/tools/core/validation";
import { listToolController } from "@/domains/tools/infra/http/controllers";
import { PrismaToolRepository } from "@/domains/tools/infra/repositories/prisma";

export const listToolControllerFactory = () => {
  return listToolController(
    PrismaToolRepository,
    listToolUseCase,
    buildListToolValidation
  );
};
