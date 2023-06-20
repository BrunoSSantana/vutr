import { CreateToolDTO, Tool } from "@/domains/tools/entities";
import { IFieldResolver } from "@/infra/graphql/resolvers";
import { IToolRepository } from "@/domains/tools/repositories";
import { IBuildCreateToolUseCase } from "@/domains/tools/usecases";
import { ICreateToolValidation } from "@/domains/tools/validation/types";

type CreateToolResolver = IFieldResolver<
  Tool,
  CreateToolDTO,
  { tool: Tool }
>

export const createToolResolver =
  (
    createToolRepository: IToolRepository,
    buildCreateToolUseCase: IBuildCreateToolUseCase,
    createToolValidation: ICreateToolValidation
  ): CreateToolResolver =>
  async (_parent, args, _contextValue, _info) => {
    const { title, description, link } = createToolValidation().validate(args);

    const tool = await buildCreateToolUseCase(createToolRepository)({
      title,
      description,
      link,
    });

    return { tool };
  };
