import { PrismaToolRepository } from "@/domains/tools/repositories/implementations/prisma";
import { buildCreateToolValidation } from "@/domains/tools/validation/implementations/zod";
import { createToolUseCase } from "@/domains/tools/usecases/create-tool.usecase";
import { createToolResolver } from "@/domains/tools/interfaces/resolvers";

export const createToolResolverFactory = () => {
  const prismaToolRepository = new PrismaToolRepository();

  return createToolResolver(
    prismaToolRepository,
    createToolUseCase,
    buildCreateToolValidation
  );
};
