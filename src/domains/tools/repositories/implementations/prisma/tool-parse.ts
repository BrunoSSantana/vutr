import { Tool } from "@/domains/tools/entities";
import { toolTagSchema } from "@/domains/tools/validation/implementations/zod";
import { formatZodError } from "@/utils";

export const toolParse = (tool: unknown): Tool => {
  const toolParsed = toolTagSchema.safeParse(tool);

  if (!toolParsed.success) {
    const error = formatZodError(toolParsed);

    throw new Error(`Error to parse tool: ${error}`);
  }

  return toolParsed.data;
}
