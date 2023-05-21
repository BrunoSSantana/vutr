import { CreateToolDTO } from "@/domains/tools";
import { toolRegisterSchema } from "@/domains/tools/validation/implementations/zod/tool.schema";
import { ICreateToolValidation } from "@/domains/tools/validation/types";

export const buildCreateToolValidation: ICreateToolValidation = <Type>() => {
  const validate = (createToolDTO: Type) => {
    try {
      const resultToolRegisterParse = toolRegisterSchema.parse(createToolDTO);

      return resultToolRegisterParse as CreateToolDTO;
    } catch (error) {
      throw new Error(error);
    }
  };

  return {
    validate,
  };
};
