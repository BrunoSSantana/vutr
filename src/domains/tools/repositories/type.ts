import {
  CreateToolDTO,
  ListToolsDTO,
  Tool,
} from "@/domains/tools/tool.entity";

export type IToolRepository = {
  create: (createToolDTO: CreateToolDTO) => Promise<Tool>;
  list: (listToolDTO: ListToolsDTO) => Promise<Tool[]>;
  delete: (id: number) => Promise<void>;
  deleteAll: () => Promise<void>;
};
