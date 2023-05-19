import { listToolUseCase } from "@/domains/tools/core/use-cases";
import { listToolResolver } from "@/domains/tools/infra/http/resolvers";
import { buildListToolValidation } from "@/domains/tools/core/validation";
import { PrismaToolRepository } from "@/domains/tools/infra/repositories/prisma";

export const listToolResolverFactory = () => {
  return listToolResolver(
    PrismaToolRepository,
    listToolUseCase,
    buildListToolValidation
  );
};
