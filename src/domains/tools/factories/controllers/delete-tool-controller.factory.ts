import { PrismaToolRepository } from "@/domains/tools/repositories/implementations/prisma";
import { buildDeleteToolValidation } from "@/domains/tools/validation/implementations/zod";
import { deleteToolUseCase } from "@/domains/tools/usecases/delete-tool.usecase";
import { deleteToolController } from "@/domains/tools/http/controllers";

export const deleteToolControllerFactory = () => {
  return deleteToolController(
    PrismaToolRepository,
    deleteToolUseCase,
    buildDeleteToolValidation
  );
};
