import { formatZodError } from "@/utils";
import { IListToolValidationBuild } from "@/domains/tools/validation/types";
import { toolListSchema } from "@/domains/tools/validation/implementations/zod/tool.schema";

export const buildListToolValidation: IListToolValidationBuild = <Type>() => {
  const validate = (listToolDTO: Type) => {
    const resultToolListParse = toolListSchema.safeParse(listToolDTO);

    if (!resultToolListParse.success) {
      throw new Error(formatZodError(resultToolListParse));
    }

    return resultToolListParse.data;
  };

  return { validate };
};
