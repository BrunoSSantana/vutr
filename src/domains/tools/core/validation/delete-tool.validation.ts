import { DeleteToolDTO } from "@/domains/tools/core";
import { toolDeleteSchema } from "@/domains/tools/core/validation";

export type IDeleteToolValidation = <Type>() => {
  validate: (deleteToolDTO: Type) => DeleteToolDTO;
};

export const buildDeleteToolValidation: IDeleteToolValidation = <Type>() => {
  const validate = (deleteToolDTO: Type) => {
    try {
      const resultToolDeleteParse = toolDeleteSchema.parse(deleteToolDTO);

      return resultToolDeleteParse as DeleteToolDTO;
    } catch (error) {
      throw new Error(error);
    }
  };

  return {
    validate,
  };
};
