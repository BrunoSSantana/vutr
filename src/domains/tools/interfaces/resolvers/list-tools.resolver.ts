import { IFieldResolver } from "@/infra/graphql/resolvers";
import { ListToolsDTO, Tool } from "@/domains/tools/entities";
import { IToolRepository } from "@/domains/tools/repositories";
import { BuildListToolUseCase } from "@/domains/tools/usecases";
import { IListToolValidationBuild } from "@/domains/tools/validation/types";

type ListToolResolver = IFieldResolver<
  Tool,
  ListToolsDTO,
  { tools: Tool[] }
>

export const listToolResolver =
  (
    listToolRepository: IToolRepository,
    buildListToolUseCase: BuildListToolUseCase,
    listToolValidation: IListToolValidationBuild
  ): ListToolResolver =>
  async (_parent, args, _contextValue, _info) => {

    const { limit, page, search } = listToolValidation().validate(args);

    const tools = await buildListToolUseCase(listToolRepository)({
      limit,
      page,
      search,
    });

    return { tools };
  };
