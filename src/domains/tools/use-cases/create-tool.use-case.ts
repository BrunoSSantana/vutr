import { CreateToolDTO, Tool } from "@/domains/tools";
import { ToolRepository } from "@/domains/tools/repositories";

export type CreateToolUseCase = (
  toolRepository: ToolRepository
) => (createToolDTO: CreateToolDTO) => Promise<Tool>;

export const createToolUseCase: CreateToolUseCase =
  (toolRepository) => async (createToolDTO) => {
    const tool = await toolRepository.create(createToolDTO);
    return tool;
  };
