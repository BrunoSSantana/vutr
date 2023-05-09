import { ToolRepository } from "@/domains/tools/core/repositories";
import { CreateToolDTO, Tool } from "@/domains/tools/core/tool.entity";

export type  CreateToolUseCase = (createToolDTO: CreateToolDTO) => Promise<Tool>;

export type BuildCreateToolUseCase = (
  toolRepository: ToolRepository
) => (createToolDTO: CreateToolDTO) => Promise<Tool>;

export const createToolUseCase: BuildCreateToolUseCase =
  (toolRepository) => async (createToolDTO) => {
    const tool = await toolRepository.create(createToolDTO);
    return tool;
  };
