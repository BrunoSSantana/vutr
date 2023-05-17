import { DeleteToolDTO } from "@/domains/tools/core";
import { toolDeleteSchema } from "@/domains/tools/core/validation";

export type IDeleteToolValidation = <Type>() => {
  validate: (deleteToolDTO: Type) => DeleteToolDTO;
};

export const buildDeleteToolValidation: IDeleteToolValidation = <Type>() => {
  const validate = (deleteToolDTO: Type) => {
    const resultToolDeleteParse = toolDeleteSchema.safeParse(deleteToolDTO);

    if (!resultToolDeleteParse.success) {
      const error = JSON.stringify(resultToolDeleteParse.error.format());

      throw new Error(error);
    }

    return resultToolDeleteParse.data;
  };

  return {
    validate,
  };
};
