import { IFieldResolver } from "@/infra/graphql/resolvers";
import { DeleteToolDTO, Tool } from "@/domains/tools/entities";
import { IToolRepository } from "@/domains/tools/repositories";
import { IBuildDeleteToolUseCase } from "@/domains/tools/usecases";
import { IDeleteToolValidation } from "@/domains/tools/validation/types";

type DeleteToolResolver = IFieldResolver<
  Tool,
  DeleteToolDTO,
  void
>

export const deleteToolResolver =
  (
    deleteToolRepository: IToolRepository,
    buildDeleteToolUseCase: IBuildDeleteToolUseCase,
    deleteToolValidation: IDeleteToolValidation
  ): DeleteToolResolver =>
  async (_parent, args: { toolId: number}, _contextValue, _info) => {
    const { toolId } = deleteToolValidation().validate(args);

    await buildDeleteToolUseCase(deleteToolRepository)({
      toolId,
    });
  };
