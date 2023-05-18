import {
  ListToolsDTO,
  Tool,
  createTool,
} from "@/domains/tools/core/tool.entity";
import { IToolRepository } from "@/domains/tools/core/repositories/type";

const Tools: Record<number, Tool> = {};

export const InMemoryToolRepository: IToolRepository = {
  async create(createToolDTO): Promise<Tool> {
    const id = Object.keys(Tools).length + 1;
    const tool = createTool({
      id,
      ...createToolDTO,
    });

    Tools[id] = tool;

    return tool;
  },

  async list(listToolsDTO: ListToolsDTO): Promise<Tool[]> {
    const tools = Object.values(Tools);

    const toolsFiltereds = tools.filter((tool) => {
      if (listToolsDTO.search) {
        const search = listToolsDTO.search.toLowerCase();

        const title = tool.title.toLowerCase();
        const description = tool.description.toLowerCase();
        const tags = tool.tags.join(" ").toLowerCase();

        const hasSearch =
          title.includes(search) ||
          description.includes(search) ||
          tags.includes(search);

        return hasSearch;
      }

      return true;
    });

    const page = listToolsDTO.page ?? 1;
    const limit = listToolsDTO.limit ?? 10;

    return toolsFiltereds.slice((page - 1) * limit, page * limit);
  },

  async delete(id: number): Promise<void> {
    const tool = Tools[id];

    if (!tool) {
      throw new Error("Tool not found");
    }

    delete Tools[id];
  },

  async deleteAll(): Promise<void> {
    Object.keys(Tools).forEach((key) => delete Tools[Number(key)]);
  },
};
