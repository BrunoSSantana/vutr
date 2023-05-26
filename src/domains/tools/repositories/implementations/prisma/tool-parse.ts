import { z } from "zod";

import { Tool } from "@/domains/tools/entities";
import { toolTagSchema } from "@/domains/tools/validation/implementations/zod";

export const toolParse = (tool: unknown): Tool => {
  const toolValidated = toolTagSchema.parse(tool)   
  return toolValidated;
}
