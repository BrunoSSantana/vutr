import { describe, expect, it } from "vitest";
import { buildCreateToolValidation } from "./create-tool.validation";
import { CreateToolDTO } from "@/domains/tools/core";

describe("createToolValidation", () => {
  it("should be validate tool with correctly values", () => {
    const createTollValidation = buildCreateToolValidation<CreateToolDTO>();
    const createTollValidationResponse = createTollValidation.validate({
      title: "title",
      description: "description",
      link: "http://link.com",
      tags: ["first-tag", "second-tag", "third-tag-and-last-tag"],
    });

    expect(createTollValidationResponse).toBeTruthy();
  });

  it("should be not validate tool with invalid link", () => {
    expect(() => {
      const createTollValidation = buildCreateToolValidation<CreateToolDTO>();
      createTollValidation.validate({
        title: "title",
        description: "description",
        link: "link.com",
        tags: ["first-tag", "second-tag"],
      });
    }).toThrowError();
  });

  it("should be not validate tool with invalid tags", () => {
    expect(() => {
      const createTollValidation = buildCreateToolValidation<CreateToolDTO>();
      createTollValidation.validate({
        title: "title",
        description: "description",
        link: "http://link.com",
        tags: ["1"],
      });
    }).toThrowError();

    expect(() => {
      const createTollValidation = buildCreateToolValidation<CreateToolDTO>();
      createTollValidation.validate({
        title: "title",
        description: "description",
        link: "http://link.com",
        tags: ["-tag"],
      });
    }).toThrowError();

    expect(() => {
      const createTollValidation = buildCreateToolValidation<CreateToolDTO>();
      createTollValidation.validate({
        title: "title",
        description: "description",
        link: "http://link.com",
        tags: ["tag-"],
      });
    }).toThrowError();
  });
});
