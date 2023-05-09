import {
  CreateToolDTO,
  ListToolsDTO,
  Tool,
} from "@/domains/tools/core/tool.entity";

export type ToolRepository = {
  create: (createToolDTO: CreateToolDTO) => Promise<Tool>;
  list: (listToolDTO: ListToolsDTO) => Promise<Tool[]>;
  delete: (id: number) => Promise<void>;
  deleteAll: () => Promise<void>;
};
