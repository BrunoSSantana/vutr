import { IToolRepository } from "@/domains/tools/repositories";
import { IBuildDeleteToolUseCase } from "@/domains/tools/usecases";
import { IDeleteToolValidation } from "@/domains/tools/validation/types";

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
