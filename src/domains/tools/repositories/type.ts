import {
  Tool,
  CreateToolDTO,
  ListToolsDTO,
  UpdateToolDTO,
} from "@/domains/tools/tool.entity";

export type IToolRepository = {
  create: (createToolDTO: CreateToolDTO) => Promise<Tool>;
  update: (updateToolDTO: UpdateToolDTO) => Promise<Tool>;
  list: (listToolDTO: ListToolsDTO) => Promise<Tool[]>;
  delete: (id: number) => Promise<void>;
  deleteAll: () => Promise<void>;
};
