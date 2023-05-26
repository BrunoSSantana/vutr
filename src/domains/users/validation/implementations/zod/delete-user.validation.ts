import { IDeleteUserValidation } from "@/domains/users/validation/types";
import { userDeleteSchema } from "@/domains/users/validation/implementations/zod/user.schema";

export const buildDeleteUserValidation: IDeleteUserValidation = <Type>() => {
  const validate = (deleteUserDTO: Type) => {

    const resultUserDeletedParse = userDeleteSchema.safeParse(deleteUserDTO);

    if (!resultUserDeletedParse.success) {

      const errorsFormated = resultUserDeletedParse.error.format()._errors.map((error) => error).join('::')
      throw new Error(errorsFormated);
    }

    return resultUserDeletedParse.data;

  };

  return {
    validate,
  };
};