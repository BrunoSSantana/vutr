import { deleteToolResolver } from "@/domains/tools/interfaces/resolvers";
import { deleteToolUseCase } from "@/domains/tools/usecases/delete-tool.usecase";
import { PrismaToolRepository } from "@/domains/tools/repositories/implementations/prisma";
import { buildDeleteToolValidation } from "@/domains/tools/validation/implementations/zod";

export const deleteToolResolverFactory = () => {
  const prismaToolRepository = new PrismaToolRepository();

  return deleteToolResolver(
    prismaToolRepository,
    deleteToolUseCase,
    buildDeleteToolValidation
  );
};
