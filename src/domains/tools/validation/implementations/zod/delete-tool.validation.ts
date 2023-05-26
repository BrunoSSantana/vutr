import { formatZodError } from "@/utils";

import { toolDeleteSchema } from "@/domains/tools/validation/implementations/zod/tool.schema";
import { IDeleteToolValidation } from "@/domains/tools/validation/types";

export const buildDeleteToolValidation: IDeleteToolValidation = <Type>() => {
  const validate = (deleteToolDTO: Type) => {
    const resultToolDeleteParse = toolDeleteSchema.safeParse(deleteToolDTO);

    if (!resultToolDeleteParse.success) {
      const errorsFormated = formatZodError(resultToolDeleteParse)
      throw new Error(errorsFormated);
    }

    return resultToolDeleteParse.data;

  };

  return {
    validate,
  };
};
