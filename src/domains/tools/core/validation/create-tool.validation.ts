import { CreateToolDTO } from "@/domains/tools/core";
import { toolRegisterSchema } from "@/domains/tools/core/validation";

export type ICreateToolValidation = <Type>() => {
  validate: (createToolDTO: Type) => CreateToolDTO;
};

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
