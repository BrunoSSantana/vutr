import { ToolRepository } from "@/domains/tools/core/repositories";
import { ListToolsDTO, Tool } from "@/domains/tools/core/tool.entity";

export type ListToolUseCase = (listToolDTO: ListToolsDTO) => Promise<Tool[]>;

export type BuildListToolUseCase = (
  toolRepository: ToolRepository
) => ListToolUseCase;

export const listToolUseCase: BuildListToolUseCase =
  (toolRepository) => async (listToolDTO) => {
    const tool = await toolRepository.list(listToolDTO);
    return tool;
  };
