import { CreateToolDTO } from "@/domains/tools";
import { toolRegisterSchema } from "@/domains/tools/validation";

export type CreateToolValidation = <T>() => {
  validate: (createToolDTO: T) => CreateToolDTO;
};

export const buildCreateToolValidation: CreateToolValidation = <T>() => {
  const validate = (createToolDTO: T) => {
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
