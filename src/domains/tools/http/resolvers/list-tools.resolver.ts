import { IToolRepository } from "@/domains/tools/repositories";
import { BuildListToolUseCase } from "@/domains/tools/usecases";
import { IListToolValidationBuild } from "@/domains/tools/validation/types";

export const listToolResolver =
  (
    listToolRepository: IToolRepository,
    buildListToolUseCase: BuildListToolUseCase,
    listToolValidation: IListToolValidationBuild
  ) =>
  async (_parent, args, _contextValue, _info) => {
    const { limit, page, search } = listToolValidation().validate(args);

    const tool = await buildListToolUseCase(listToolRepository)({
      limit,
      page,
      search,
    });

    return tool;
  };
