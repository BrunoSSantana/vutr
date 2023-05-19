import { createToolUseCase } from "@/domains/tools/core/use-cases/create-tool.use-case";
import { buildCreateToolValidation } from "@/domains/tools/core/validation";
import { createToolResolver } from "@/domains/tools/infra/http/resolvers";
import { PrismaToolRepository } from "@/domains/tools/infra/repositories/prisma";

export const createToolResolverFactory = () => {
  return createToolResolver(
    PrismaToolRepository,
    createToolUseCase,
    buildCreateToolValidation
  );
};
