import { CreateToolDTO, Tool, ListToolsDTO, UpdateToolDTO } from "@/domains/tools/entities";
import { IToolRepository } from "@/domains/tools/repositories";
import { PrismaClient } from "@prisma/client";
import { toolParse } from "./tool-parse";

const prisma = new PrismaClient();

export class PrismaToolRepository implements IToolRepository {
  async create(createToolDTO: CreateToolDTO): Promise<Tool> {
    try {
      const tool = await prisma.tool.create({
        data: {
          title: createToolDTO.title,
          link: createToolDTO.link,
          description: createToolDTO.description,
        },
        include: {
          tags: true,
        },
      });

      return toolParse(tool);
    } catch (error) {
      throw new Error('Error to create tool');
    }
  }

  async list(listToolDTO: ListToolsDTO): Promise<Tool[]> {
    const { search, page = 1, limit = 10 } = listToolDTO;
    const where = search ? {
      OR: [
        {
          title: {
            contains: search,
          },
        },
        {
          description: {
            contains: search,
          },
        },
        {
          link: {
            contains: search,
          },
        },
        {
          tags: {
            some: {
              title: {
                contains: search,
              },
            },
          },
        },
      ],
    } : {};

    try {
      const tools = await prisma.tool.findMany({
        where,
        include: {
          tags: true,
        },
        skip: (page - 1) * limit,
        take: limit,
      });

      return tools.map(toolParse);
    } catch (error) {
      return [];
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await prisma.tool.delete({
        where: {
          id,
        },
      });
    }
    catch (error) {
      throw new Error('Error to delete tool');
    }
  }

  async deleteAll(): Promise<void> {
    await prisma.tool.deleteMany({});
  }

  async update(updateToolDTO: UpdateToolDTO): Promise<Tool> {
    const { id, ...data } = updateToolDTO;

    try {
      const tool = await prisma.tool.update({
        where: {
          id,
        },
        data,
      });

      return toolParse(tool);
    } catch (error) {
      throw new Error('Error to update tool');
    }
  }
};
