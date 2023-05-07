import { Tool, createTool } from "../tool.entity";
import { ToolRepository } from "./type";

const Tools: Record<number, Tool> = {};

export const InMemoryToolRepository: ToolRepository = {
  async create(createToolDTO) {
    const id = Object.keys(Tools).length + 1;
    const tool = createTool({
      id,
      ...createToolDTO,
    });

    Tools[id] = tool;

    return tool;
  },

  async list() {
    return Object.values(Tools);
  },

  async delete(id: number) {
    delete Tools[id];
  },
};
