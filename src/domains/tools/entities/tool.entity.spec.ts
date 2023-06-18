import { describe, expect, it } from "vitest";
import { createTool, Tool, updateTool, UpdateToolDTO } from "./tool.entity";

describe("createTool", () => {
  it("should create a new tool with the correct properties", () => {
    // Set up test data
    const toolData = {
      id: 1,
      title: "Test Tool",
      link: "https://test.com",
      description: "A tool for testing",
      userId: 1,
    };

    // Call the function
    const result = createTool(toolData);

    // Check that the tool was created with the correct properties
    expect(result).toEqual({
      ...toolData,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });
});

describe("updateTool", () => {
  it("should update a tool with the correct properties", () => {
    // Set up test data
    const tool: Tool = {
      id: 1,
      title: "Test Tool",
      link: "https://test.com",
      description: "A tool for testing",
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const updateData: UpdateToolDTO = {
      id: 1,
      title: "Updated Tool",
      link: "https://updated.com",
      description: "An updated tool for testing",
      userId: 2,
    };

    // Call the function
    const result = updateTool(tool, updateData);

    // Check that the tool was updated with the correct properties
    expect(result).toEqual({
      ...tool,
      ...updateData,
      updatedAt: expect.any(Date),
    });
  });
});