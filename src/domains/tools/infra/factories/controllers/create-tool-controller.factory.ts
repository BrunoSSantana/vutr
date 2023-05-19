import { createToolUseCase } from "@/domains/tools/core/use-cases/create-tool.use-case";
import { buildCreateToolValidation } from "@/domains/tools/core/validation";
import { createToolController } from "@/domains/tools/infra/http/controllers";
import { PrismaToolRepository } from "@/domains/tools/infra/repositories/prisma";

export const createToolControllerFactory = () => {
  return createToolController(
    PrismaToolRepository,
    createToolUseCase,
    buildCreateToolValidation
  );
};
