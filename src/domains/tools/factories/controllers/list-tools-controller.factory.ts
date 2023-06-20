import { listToolUseCase } from "@/domains/tools/usecases/list-tools.usecase";
import { buildListToolValidation } from "@/domains/tools/validation/implementations/zod";
import { listToolController } from "@/domains/tools/interfaces/controllers";
import { PrismaToolRepository } from "@/domains/tools/repositories/implementations/prisma";

export const listToolControllerFactory = () => {
  const prismaToolRepository = new PrismaToolRepository();

  return listToolController(
    prismaToolRepository,
    listToolUseCase,
    buildListToolValidation
  );
};
