import { toolListSchema } from "@/domains/tools/validation/implementations/zod/tool.schema";
import { IListToolValidationBuild } from "@/domains/tools/validation/types";

export const buildListToolValidation: IListToolValidationBuild = <Type>() => {
  const validate = (listToolDTO: Type) => {
    try {
      const resultToolListParse = toolListSchema.parse(
        JSON.parse(JSON.stringify(listToolDTO))
      );

      return resultToolListParse;
    } catch (error) {
      throw new Error(error);
    }
  };

  return { validate };
};
