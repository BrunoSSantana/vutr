import { beforeEach,afterEach, describe, expect, it } from "vitest";
import { InMemoryToolRepository } from "@/domains/tools/repositories/implementations/in-memory";
import { IToolRepository } from "@/domains/tools/repositories";
import {
  updateToolUseCase,
  IUpdateToolUseCase,
} from "@/domains/tools/usecases";
import { UpdateToolDTO } from "../tool.entity";

describe("UpdateToolUseCase", () => {
  let toolsRepository: IToolRepository;
  let sut: IUpdateToolUseCase;

  beforeEach(() => {
    toolsRepository = InMemoryToolRepository;
    sut = updateToolUseCase(toolsRepository);

  });

  afterEach(() => {
    InMemoryToolRepository.deleteAll();
  });

  it("should update a tool", async () => {
    const toolCreated = await toolsRepository.create({
      title: "title",
      link: "link",
      description: "description",
    });

    const updateToolDTO: UpdateToolDTO = {
      id: toolCreated.id,
      title: "any_title",
      link: "link_any",
      description: "description",
    };

    const tool = sut(updateToolDTO);

    expect(tool).resolves.toEqual({
      id: expect.any(Number),
      ...updateToolDTO,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it("should throw if tool not found", async () => {
    const updateToolDTO: UpdateToolDTO = {
      id: 1,
      title: "any_title",
      link: "link_any",
      description: "description",
    };

    await expect(sut(updateToolDTO)).rejects.toThrowError(/^Tool not found$/);
  });
});
