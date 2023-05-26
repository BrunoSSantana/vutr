import { IUpdateUserValidation } from "@/domains/users/validation/types";
import { userUpdateSchema } from "@/domains/users/validation/implementations/zod/user.schema";

export const buildUpdateUserValidation: IUpdateUserValidation = <Type>() => {
  const validate = (updateUserDTO: Type) => {

    const resultUserUpdatedParse = userUpdateSchema.safeParse(updateUserDTO);

    if (!resultUserUpdatedParse.success) {

      const errorsFormated = resultUserUpdatedParse.error.format()._errors.map((error) => error).join('::')
      throw new Error(errorsFormated);
    }

    return resultUserUpdatedParse.data;

  };

  return {
    validate,
  };
};