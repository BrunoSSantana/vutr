import { listToolUseCase } from "@/domains/tools/usecases";
import { listToolResolver } from "@/domains/tools/http/resolvers";
import { buildListToolValidation } from "@/domains/tools/validation/implementations/zod";
import { PrismaToolRepository } from "@/domains/tools/repositories/implementations/prisma";

export const listToolResolverFactory = () => {
  return listToolResolver(
    PrismaToolRepository,
    listToolUseCase,
    buildListToolValidation
  );
};
