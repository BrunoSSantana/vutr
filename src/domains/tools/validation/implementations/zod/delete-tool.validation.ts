import { DeleteToolDTO } from "@/domains/tools";
import { toolDeleteSchema } from "@/domains/tools/validation/implementations/zod/tool.schema";
import { IDeleteToolValidation } from "@/domains/tools/validation/types";

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
