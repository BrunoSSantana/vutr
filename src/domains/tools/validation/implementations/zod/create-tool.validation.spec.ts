import { describe, expect, it } from "vitest";
import { buildCreateToolValidation } from "./create-tool.validation";
import { CreateToolDTO } from "@/domains/tools";

describe("createToolValidation", () => {
  it("should be validate tool with correctly values", () => {
    const createTollValidation = buildCreateToolValidation<CreateToolDTO>();
    const createTollValidationResponse = createTollValidation.validate({
      title: "title",
      description: "description",
      link: "http://link.com",
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
      });
    }).toThrowError();
  });
});
