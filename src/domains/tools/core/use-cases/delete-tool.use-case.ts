import { IToolRepository } from "@/domains/tools/core/repositories";
import { DeleteToolDTO } from "@/domains/tools/core/tool.entity";

export type IDeleteToolUseCase = (deleteToolDTO: DeleteToolDTO) => Promise<void>;

export type IBuildDeleteToolUseCase = (
  toolRepository: IToolRepository
) => IDeleteToolUseCase;

export const deleteToolUseCase: IBuildDeleteToolUseCase =
  (toolRepository) => async (deleteToolDTO: DeleteToolDTO) => {
    await toolRepository.delete(deleteToolDTO.toolId);
  };
