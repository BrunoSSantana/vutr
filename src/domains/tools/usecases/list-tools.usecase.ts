import { IToolRepository } from "@/domains/tools/repositories";
import { ListToolsDTO, Tool } from "@/domains/tools/tool.entity";

export type ListToolUseCase = (listToolDTO: ListToolsDTO) => Promise<Tool[]>;

export type BuildListToolUseCase = (
  toolRepository: IToolRepository
) => ListToolUseCase;

export const listToolUseCase: BuildListToolUseCase =
  (toolRepository) => async (listToolDTO) => {
    const tool = await toolRepository.list(listToolDTO);
    return tool;
  };
