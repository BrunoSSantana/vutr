import { listToolUseCase } from "@/domains/tools/core/use-cases";
import { listToolResolver } from "@/domains/tools/infra/http/resolvers";
import { InMemoryToolRepository } from "@/domains/tools/infra/repositories";
import { buildListToolValidation } from "@/domains/tools/core/validation";

export const listToolResolverFactory = () => {
  return listToolResolver(
    InMemoryToolRepository,
    listToolUseCase,
    buildListToolValidation
  );
};