import { buildCreateToolValidation } from "@/domains/tools/validation/implementations/zod";
import { PrismaToolRepository } from "@/domains/tools/repositories/implementations/prisma";
import { createToolUseCase } from "@/domains/tools/usecases/create-tool.usecase";
import { createToolController } from "@/domains/tools/http/controllers";

export const createToolControllerFactory = () => {
  return createToolController(
    PrismaToolRepository,
    createToolUseCase,
    buildCreateToolValidation
  );
};
