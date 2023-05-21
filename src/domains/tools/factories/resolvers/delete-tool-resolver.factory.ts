import { buildDeleteToolValidation } from "@/domains/tools/validation/implementations/zod";
import { PrismaToolRepository } from "@/domains/tools/repositories/implementations/prisma";
import { deleteToolUseCase } from "@/domains/tools/use-cases/delete-tool.use-case";
import { deleteToolResolver } from "@/domains/tools/http/resolvers";

export const deleteToolResolverFactory = () => {
  return deleteToolResolver(
    PrismaToolRepository,
    deleteToolUseCase,
    buildDeleteToolValidation
  );
};
