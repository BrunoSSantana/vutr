import { IToolRepository } from "@/domains/tools/core/repositories";
import { IBuildCreateToolUseCase } from "@/domains/tools/core/use-cases";
import { ICreateToolValidation } from "@/domains/tools/core/validation";

export const createToolResolver =
  (
    createToolRepository: IToolRepository,
    buildCreateToolUseCase: IBuildCreateToolUseCase,
    createToolValidation: ICreateToolValidation
  ) =>
  async (_parent, args, _contextValue, _info) => {
    const { title, description, link } =
      createToolValidation().validate(args);

    const tool = await buildCreateToolUseCase(createToolRepository)({
      title,
      description,
      link,
    });

    return tool;
  };
