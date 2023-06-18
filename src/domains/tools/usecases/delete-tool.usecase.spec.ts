import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryToolRepository } from "@/domains/tools/repositories/implementations/in-memory";
import { IToolRepository } from "@/domains/tools/repositories";
import {
  deleteToolUseCase,
  IDeleteToolUseCase,
} from "@/domains/tools/usecases";
import { DeleteToolDTO } from "../entities";

describe("DeleteToolUseCase", () => {
  let toolsRepository: IToolRepository;
  let sut: IDeleteToolUseCase;

  beforeEach(() => {
    toolsRepository = InMemoryToolRepository;
    sut = deleteToolUseCase(toolsRepository);
  });

  it("should delete a tool", async () => {
    const createToolDTO = {
      title: "title",
      description: "description",
      link: "http://link.com",
    };

    const toolCreated = await toolsRepository.create(createToolDTO);

    const deleteToolDTO: DeleteToolDTO = {
      toolId: toolCreated.id,
    };

    sut(deleteToolDTO);

    const tools = await toolsRepository.list({});

    const toolExists = tools.some((tool) => tool.id === deleteToolDTO.toolId);

    expect(toolExists).toBe(false);
  });

  it("should throw an error if tool does not exists", async () => {
    const deleteToolDTO: DeleteToolDTO = {
      toolId: 0,
    };

    await expect(sut(deleteToolDTO)).rejects.toThrow();
  }

  );
});
