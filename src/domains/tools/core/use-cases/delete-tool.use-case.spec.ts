import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryToolRepository } from "@/domains/tools/infra/repositories";
import { IToolRepository } from "@/domains/tools/core/repositories";
import {
  createToolUseCase,
  ICreateToolUseCase,
} from "@/domains/tools/core/use-cases";

describe("CreateToolUseCase", () => {
  let toolsRepository: IToolRepository;
  let sut: ICreateToolUseCase;

  beforeEach(() => {
    toolsRepository = InMemoryToolRepository;
    sut = createToolUseCase(toolsRepository);
  });

  it("should create a tool", () => {
    const createToolDTO = {
      title: "title",
      link: "link",
      description: "description",
      tags: ["tag1", "tag2"],
    };

    const tool = sut(createToolDTO);

    expect(tool).resolves.toEqual({
      id: expect.any(Number),
      ...createToolDTO,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });
});
