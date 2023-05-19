import { CreateToolDTO, Tool, ListToolsDTO } from "@/domains/tools/core";
import { IToolRepository } from "@/domains/tools/core/repositories";
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
          // tags: {
          //   create: createToolDTO.tags.map((tag) => ({
          //     title: tag,
          //   })),
          // },
        },
        include: {
          tags: true,
        },
      });

      return tool;
    } catch (error) {
      throw new Error(error);
    }
  },
  async list(listToolDTO: ListToolsDTO): Promise<Tool[]> {
    const { search, page = 1, limit = 10 } = listToolDTO;
    try {
      const tools = await prisma.tool.findMany({
        where: search? {
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
      throw new Error(error);
    }
  },
  async delete(id: number): Promise<void> {
    await prisma.tool.delete({
      where: {
        id,
      },
    });
  },
  async deleteAll(): Promise<void> {
    await prisma.tool.deleteMany({});
  },
};
