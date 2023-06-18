import { IToolRepository } from "@/domains/tools/repositories";
import { CreateToolDTO, Tool } from "@/domains/tools/entities/tool.entity";

export type ICreateToolUseCase = (createToolDTO: CreateToolDTO) => Promise<Tool>;

export type IBuildCreateToolUseCase = (
  toolRepository: IToolRepository
) => (createToolDTO: CreateToolDTO) => Promise<Tool>;

export const createToolUseCase: IBuildCreateToolUseCase =
  (toolRepository) => async (createToolDTO) => {
    const tool = await toolRepository.create(createToolDTO);
    return tool;
  };
