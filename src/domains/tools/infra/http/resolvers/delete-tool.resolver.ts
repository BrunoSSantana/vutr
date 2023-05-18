import { IToolRepository } from "@/domains/tools/core/repositories";
import { IBuildDeleteToolUseCase } from "@/domains/tools/core/use-cases";
import { IDeleteToolValidation } from "@/domains/tools/core/validation";

export const deleteToolResolver =
  (
    deleteToolRepository: IToolRepository,
    buildDeleteToolUseCase: IBuildDeleteToolUseCase,
    deleteToolValidation: IDeleteToolValidation
  ) =>
  async (_parent, args, _contextValue, _info) => {
    const { toolId } = deleteToolValidation().validate(args);

    await buildDeleteToolUseCase(deleteToolRepository)({
      toolId,
    });

    return true;
  };