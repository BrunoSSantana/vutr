import { Tool } from "../tool.entity";
import { CreateToolDTO } from "../tool.entity";

export type ToolRepository = {
  create: (createToolDTO: CreateToolDTO) => Promise<Tool>;
  list: () => Promise<Tool[]>;
  delete: (id: number) => Promise<void>;
};
