import { IUpdateUserValidation } from "@/domains/users/validation/types";
import { userUpdateSchema } from "@/domains/users/validation/implementations/zod/user.schema";
import { formatZodError } from "@/utils";

export const buildUpdateUserValidation: IUpdateUserValidation = <Type>() => {
  const validate = (updateUserDTO: Type) => {

    const resultUserUpdatedParse = userUpdateSchema.safeParse(updateUserDTO);

    if (!resultUserUpdatedParse.success) {
      const errorsFormat = formatZodError(resultUserUpdatedParse);

      throw new Error(`Error to parse user: ${errorsFormat}`);
    }

    return resultUserUpdatedParse.data;

  };

  return {
    validate,
  };
};