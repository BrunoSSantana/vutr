import { createToolUseCase } from "@/domains/tools/core/use-cases/create-tool.use-case";
import { buildCreateToolValidation } from "@/domains/tools/core/validation";
import { createToolResolver } from "@/domains/tools/infra/http/resolvers";
import { InMemoryToolRepository } from "@/domains/tools/infra/repositories";

export const createToolResolverFactory = () => {
  return createToolResolver(
    InMemoryToolRepository,
    createToolUseCase,
    buildCreateToolValidation
  );
};
