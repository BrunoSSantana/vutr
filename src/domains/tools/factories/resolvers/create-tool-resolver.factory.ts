import { PrismaToolRepository } from "@/domains/tools/repositories/implementations/prisma";
import { buildCreateToolValidation } from "@/domains/tools/validation/implementations/zod";
import { createToolUseCase } from "@/domains/tools/use-cases/create-tool.use-case";
import { createToolResolver } from "@/domains/tools/http/resolvers";

export const createToolResolverFactory = () => {
  return createToolResolver(
    PrismaToolRepository,
    createToolUseCase,
    buildCreateToolValidation
  );
};