import { buildDeleteToolValidation } from "@/domains/tools/validation/implementations/zod";
import { PrismaToolRepository } from "@/domains/tools/repositories/implementations/prisma";
import { deleteToolUseCase } from "@/domains/tools/usecases/delete-tool.usecase";
import { deleteToolResolver } from "@/domains/tools/http/resolvers";

export const deleteToolResolverFactory = () => {
  return deleteToolResolver(
    PrismaToolRepository,
    deleteToolUseCase,
    buildDeleteToolValidation
  );
};
