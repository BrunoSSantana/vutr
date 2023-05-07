import { createToolController } from "@/domains/tools/http/controllers";
import { InMemoryToolRepository } from "../repositories/in-memory-tool.repository";
import { createToolUseCase } from "../use-cases/create-tool.use-case";
import { buildCreateToolValidation } from "../validation/create-tool.validation";

export const createToolControllerFactory = () => {
  return createToolController(
    InMemoryToolRepository,
    createToolUseCase,
    buildCreateToolValidation
  );
};
