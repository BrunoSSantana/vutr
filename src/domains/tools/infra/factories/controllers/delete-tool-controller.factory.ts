import { deleteToolUseCase } from "@/domains/tools/core/use-cases/delete-tool.use-case";
import { buildDeleteToolValidation } from "@/domains/tools/core/validation";
import { deleteToolController } from "@/domains/tools/infra/http/controllers";
import { PrismaToolRepository } from "@/domains/tools/infra/repositories/prisma";

export const deleteToolControllerFactory = () => {
  return deleteToolController(
    PrismaToolRepository,
    deleteToolUseCase,
    buildDeleteToolValidation
  );
};
