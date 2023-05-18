import { IToolRepository } from "@/domains/tools/core/repositories";
import { BuildListToolUseCase } from "@/domains/tools/core/use-cases";
import { IListToolValidationBuild } from "@/domains/tools/core/validation";


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