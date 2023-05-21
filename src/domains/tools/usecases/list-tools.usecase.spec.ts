import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { InMemoryToolRepository } from "@/domains/tools/repositories/implementations/in-memory";
import { IToolRepository } from "@/domains/tools/repositories";
import { ListToolsDTO } from "@/domains/tools";
import { listToolUseCase, ListToolUseCase } from "@/domains/tools/usecases";

describe("ListToolUseCase", () => {
  let toolsRepository: IToolRepository;
  let sut: ListToolUseCase;

  beforeEach(() => {
    toolsRepository = InMemoryToolRepository;
    sut = listToolUseCase(toolsRepository);
  });

  afterEach(() => {
    // TODO: otimizar para não precisar deletar todos os registros, utlizar tática do schema, para cada teste um novo schema
    toolsRepository.deleteAll();
  });

  it("should list a tool by search case insensitive", async () => {
    const denoTool = {
      title: "Deno",
      link: "https://deno.land/",
      description:
        "Deno is a simple, modern and secure runtime for JavaScript and TypeScript that uses V8 and is built in Rust.",
      tags: ["runtime", "typescript", "javascript"],
    };
    toolsRepository.create(denoTool);

    const nodeTool = {
      title: "Node",
      link: "https://nodejs.org/en/",
      description:
        "Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.",
      tags: ["runtime", "javascript"],
    };
    toolsRepository.create(nodeTool);

    const listToolDTO: ListToolsDTO = {
      search: "deno",
      limit: 10,
      page: 1,
    };

    const tool = await sut(listToolDTO);

    expect(tool).toHaveLength(1);

    expect(tool).toEqual(
      expect.arrayContaining([expect.objectContaining(denoTool)])
    );
  });

  it("should list a tool by tag case insensitive", async () => {
    const denoTool = {
      title: "Deno",
      link: "https://deno.land/",
      description:
        "Deno is a simple, modern and secure runtime for JavaScript and TypeScript that uses V8 and is built in Rust.",
      tags: ["runtime", "typescript", "javascript"],
    };
    toolsRepository.create(denoTool);

    const nodeTool = {
      title: "Node",
      link: "https://nodejs.org/en/",
      description:
        "Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.",
      tags: ["runtime", "javascript"],
    };
    toolsRepository.create(nodeTool);

    const listToolDTO: ListToolsDTO = {
      search: "javascript",
      limit: 10,
      page: 1,
    };

    const tools = await sut(listToolDTO);

    expect(tools).toHaveLength(2);

    expect(tools).toEqual(
      expect.arrayContaining([
        expect.objectContaining(denoTool),
        expect.objectContaining(nodeTool),
      ])
    );
  });

  it("should list tools by pagination", async () => {
    const denoTool = {
      title: "Deno",
      link: "https://deno.land/",
      description:
        "Deno is a simple, modern and secure runtime for JavaScript and TypeScript that uses V8 and is built in Rust.",
      tags: ["runtime", "typescript", "javascript"],
    };
    toolsRepository.create(denoTool);

    const nodeTool = {
      title: "Node",
      link: "https://nodejs.org/en/",
      description:
        "Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.",
      tags: ["runtime", "javascript"],
    };
    toolsRepository.create(nodeTool);

    const listToolDTO: ListToolsDTO = {
      search: "javascript",
      limit: 1,
      page: 1,
    };

    const tools = await sut(listToolDTO);

    expect(tools).toHaveLength(1);

    expect(tools).toEqual(
      expect.arrayContaining([expect.objectContaining(denoTool)])
    );

    const listToolDTO2: ListToolsDTO = {
      search: "javascript",
      limit: 1,
      page: 2,
    };

    const tools2 = await sut(listToolDTO2);

    expect(tools2).toHaveLength(1);

    expect(tools2).toEqual(
      expect.arrayContaining([expect.objectContaining(nodeTool)])
    );
  });
});
