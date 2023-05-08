import { createToolUseCase } from "@/domains/tools/core/use-cases/create-tool.use-case";
import { buildCreateToolValidation } from "@/domains/tools/core/validation";
import { createToolController } from "@/domains/tools/infra/http/controllers";
import { InMemoryToolRepository } from "@/domains/tools/infra/repositories";

export const createToolControllerFactory = () => {
  return createToolController(
    InMemoryToolRepository,
    createToolUseCase,
    buildCreateToolValidation
  );
};
