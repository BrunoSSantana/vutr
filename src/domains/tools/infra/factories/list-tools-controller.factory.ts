import { listToolUseCase } from "@/domains/tools/core/use-cases/list-tools.use-case";
import { buildListToolValidation } from "@/domains/tools/core/validation";
import { listToolController } from "@/domains/tools/infra/http/controllers";
import { InMemoryToolRepository } from "@/domains/tools/infra/repositories";

export const listToolControllerFactory = () => {
  return listToolController(
    InMemoryToolRepository,
    listToolUseCase,
    buildListToolValidation
  );
};
