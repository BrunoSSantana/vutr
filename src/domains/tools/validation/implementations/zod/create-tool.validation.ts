import { formatZodError } from "@/utils";

import { ICreateToolValidation } from "@/domains/tools/validation/types";
import { toolRegisterSchema } from "@/domains/tools/validation/implementations/zod/tool.schema";

export const buildCreateToolValidation: ICreateToolValidation = <Type>() => {
  const validate = (createToolDTO: Type) => {

    const resultToolRegisterParse = toolRegisterSchema.safeParse(createToolDTO);

    if (!resultToolRegisterParse.success) {

      const errorsFormat = formatZodError(resultToolRegisterParse)
      throw new Error(errorsFormat);
    }

    return resultToolRegisterParse.data;

  };

  return {
    validate,
  };
};
