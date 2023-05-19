import { deleteToolUseCase } from "@/domains/tools/core/use-cases/delete-tool.use-case";
import { buildDeleteToolValidation } from "@/domains/tools/core/validation";
import { deleteToolResolver } from "@/domains/tools/infra/http/resolvers";
import { PrismaToolRepository } from "@/domains/tools/infra/repositories/prisma";

export const deleteToolResolverFactory = () => {
  return deleteToolResolver(
    PrismaToolRepository,
    deleteToolUseCase,
    buildDeleteToolValidation
  );
};
