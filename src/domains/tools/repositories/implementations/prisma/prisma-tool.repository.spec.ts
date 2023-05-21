import { PrismaToolRepository } from './prisma-tool.repository';
import { CreateToolDTO, ListToolsDTO } from '@/domains/tools';
import { PrismaClient } from '@prisma/client';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';

const prisma = new PrismaClient();

describe('PrismaToolRepository', () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await prisma.tool.deleteMany({});
  });

  describe('create', () => {
    it('should create a tool', async () => {
      const createToolDTO: CreateToolDTO = {
        title: 'Test Tool',
        link: 'https://testtool.com',
        description: 'A tool for testing',
      };

      const tool = await PrismaToolRepository.create(createToolDTO);

      expect(tool.title).toEqual(createToolDTO.title);
      expect(tool.link).toEqual(createToolDTO.link);
      expect(tool.description).toEqual(createToolDTO.description);
    });

    it('should not create a tool without titlw', async () => {
      const createToolDTO: CreateToolDTO = {
        title: undefined,
        link: 'https://testtool.com',
        description: 'A tool for testing',
      };

      await expect(PrismaToolRepository.create(createToolDTO)).rejects.toThrow();
    });
  });

  describe('list', () => {
    it('should list all tools', async () => {
      const createToolDTO: CreateToolDTO = {
        title: 'Test Tool',
        link: 'https://testtool.com',
        description: 'A tool for testing',
      };

      await prisma.tool.create({
        data: createToolDTO,
      });

      const listToolDTO: ListToolsDTO = {};

      const tools = await PrismaToolRepository.list(listToolDTO);

      expect(tools.length).toEqual(1);
      expect(tools[0].title).toEqual(createToolDTO.title);
      expect(tools[0].link).toEqual(createToolDTO.link);
      expect(tools[0].description).toEqual(createToolDTO.description);
    });

    it('should list tools with search query', async () => {
      const createToolDTO: CreateToolDTO = {
        title: 'Test Tool',
        link: 'https://testtool.com',
        description: 'A tool for testing',
      };

      await prisma.tool.create({
        data: createToolDTO,
      });

      const listToolDTO: ListToolsDTO = {
        search: 'testing',
      };

      const tools = await PrismaToolRepository.list(listToolDTO);

      expect(tools.length).toEqual(1);
      expect(tools[0].title).toEqual(createToolDTO.title);
      expect(tools[0].link).toEqual(createToolDTO.link);
      expect(tools[0].description).toEqual(createToolDTO.description);
    });

    it('should list tools with search query and return empty array', async () => {
      const createToolDTO: CreateToolDTO = {
        title: 'Test Tool',
        link: 'https://testtool.com',
        description: 'A tool for testing',
      };

      await prisma.tool.create({
        data: createToolDTO,
      });

      const listToolDTO: ListToolsDTO = {
        page: 0,
      };

      const tools = await PrismaToolRepository.list(listToolDTO);

      expect(tools.length).toEqual(0);
    }

    );
  });

  describe('delete', () => {
    it('should delete a tool', async () => {
      const createToolDTO: CreateToolDTO = {
        title: 'Test Tool',
        link: 'https://testtool.com',
        description: 'A tool for testing',
      };

      const tool = await prisma.tool.create({
        data: createToolDTO,
      });

      await PrismaToolRepository.delete(tool.id);

      const deletedTool = await prisma.tool.findUnique({
        where: {
          id: tool.id,
        },
      });

      expect(deletedTool).toBeNull();
    });
  });

  describe('deleteAll', () => {
    it('should delete all tools', async () => {
      const createToolDTO: CreateToolDTO = {
        title: 'Test Tool',
        link: 'https://testtool.com',
        description: 'A tool for testing',
      };

      await prisma.tool.create({
        data: createToolDTO,
      });

      await PrismaToolRepository.deleteAll();

      const tools = await prisma.tool.findMany();

      expect(tools.length).toEqual(0);
    });
  });

  describe('update', () => {
    it('should update a tool', async () => {
      const createToolDTO: CreateToolDTO = {
        title: 'Test Tool',
        link: 'https://testtool.com',
        description: 'A tool for testing',
      };

      const tool = await prisma.tool.create({
        data: createToolDTO,
      });

      const updateToolDTO = {
        id: tool.id,
        title: 'Updated Test Tool',
        link: 'https://updatedtesttool.com',
        description: 'An updated tool for testing',
      };

      const updatedTool = await PrismaToolRepository.update(updateToolDTO);

      expect(updatedTool.title).toEqual(updateToolDTO.title);
      expect(updatedTool.link).toEqual(updateToolDTO.link);
      expect(updatedTool.description).toEqual(updateToolDTO.description);
    });
  });
});