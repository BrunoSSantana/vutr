import { listToolUseCase } from "@/domains/tools/usecases";
import { listToolResolver } from "@/domains/tools/interfaces/resolvers";
import { buildListToolValidation } from "@/domains/tools/validation/implementations/zod";
import { PrismaToolRepository } from "@/domains/tools/repositories/implementations/prisma";

export const listToolResolverFactory = () => {
  const prismaToolRepository = new PrismaToolRepository();
  return listToolResolver(
    prismaToolRepository,
    listToolUseCase,
    buildListToolValidation
  );
};
