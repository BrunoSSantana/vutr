import { PrismaToolRepository } from "@/domains/tools/repositories/implementations/prisma";
import { buildDeleteToolValidation } from "@/domains/tools/validation/implementations/zod";
import { deleteToolUseCase } from "@/domains/tools/usecases/delete-tool.usecase";
import { deleteToolController } from "@/domains/tools/interfaces/controllers";

export const deleteToolControllerFactory = () => {
  const prismaToolRepository = new PrismaToolRepository();

  return deleteToolController(
    prismaToolRepository,
    deleteToolUseCase,
    buildDeleteToolValidation
  );
};
