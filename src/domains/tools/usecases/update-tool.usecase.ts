import { IToolRepository } from "@/domains/tools/repositories";
import { UpdateToolDTO, Tool } from "@/domains/tools/tool.entity";

export type IUpdateToolUseCase = (updateToolDTO: UpdateToolDTO) => Promise<Tool>;

export type IBuildUpdateToolUseCase = (
  toolRepository: IToolRepository
) => (updateToolDTO: UpdateToolDTO) => Promise<Tool>;

export const updateToolUseCase: IBuildUpdateToolUseCase =
  (toolRepository) => async (updateToolDTO) => {
    const tool = await toolRepository.update(updateToolDTO);
    return tool;
  };
