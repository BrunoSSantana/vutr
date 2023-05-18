import { deleteToolUseCase } from "@/domains/tools/core/use-cases/delete-tool.use-case";
import { buildDeleteToolValidation } from "@/domains/tools/core/validation";
import { deleteToolResolver } from "@/domains/tools/infra/http/resolvers";
import { InMemoryToolRepository } from "@/domains/tools/infra/repositories";

export const deleteToolResolverFactory = () => {
  return deleteToolResolver(
    InMemoryToolRepository,
    deleteToolUseCase,
    buildDeleteToolValidation
  );
};
