import { listToolUseCase } from "@/domains/tools/use-cases/list-tools.use-case";
import { buildListToolValidation } from "@/domains/tools/validation/implementations/zod";
import { listToolController } from "@/domains/tools/http/controllers";
import { PrismaToolRepository } from "@/domains/tools/repositories/implementations/prisma";

export const listToolControllerFactory = () => {
  return listToolController(
    PrismaToolRepository,
    listToolUseCase,
    buildListToolValidation
  );
};