import { CreateToolDTO } from "@/domains/tools/core";
import { toolRegisterSchema } from "@/domains/tools/core/validation";

export type ICreateToolValidation = <Type>() => {
  validate: (createToolDTO: Type) => CreateToolDTO;
};

export const buildCreateToolValidation: ICreateToolValidation = <Type>() => {
  const validate = (createToolDTO: Type) => {
    const resultToolRegisterParse = toolRegisterSchema.safeParse(createToolDTO);

    if (!resultToolRegisterParse.success) {
      const error = JSON.stringify(resultToolRegisterParse.error.format());

      throw new Error(error);
    }

    return resultToolRegisterParse.data;
  };

  return {
    validate,
  };
};
