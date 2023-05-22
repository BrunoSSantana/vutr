import { CreateToolDTO, Tool, ListToolsDTO } from "@/domains/tools";
import { IToolRepository } from "@/domains/tools/repositories";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const PrismaToolRepository: IToolRepository = {
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

      return tool;
    } catch (error) {
      throw new Error('Error to create tool');
    }
  },
  async list(listToolDTO: ListToolsDTO): Promise<Tool[]> {
    const { search, page = 1, limit = 10 } = listToolDTO;
    try {
      const tools = await prisma.tool.findMany({
        where: search ? {
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
        } : {},
        include: {
          tags: true,
        },
        skip: (page - 1) * limit,
        take: limit,
      });

      return tools;
    } catch (error) {
      return [];
    }
  },
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
  },
  async deleteAll(): Promise<void> {
    await prisma.tool.deleteMany({});
  },
  async update(updateToolDTO) {
    const { id, ...data } = updateToolDTO;

    try {
      const tool = await prisma.tool.update({
        where: {
          id,
        },
        data,
      });

      return tool;
    } catch (error) {
      throw new Error('Error to update tool');
    }
  },
};
