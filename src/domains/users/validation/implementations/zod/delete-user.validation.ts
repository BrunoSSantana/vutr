import { IDeleteUserValidation } from "@/domains/users/validation/types";
import { userDeleteSchema } from "@/domains/users/validation/implementations/zod/user.schema";
import { formatZodError } from "@/utils";

export const buildDeleteUserValidation: IDeleteUserValidation = <Type>() => {
  const validate = (deleteUserDTO: Type) => {

    const resultUserDeletedParse = userDeleteSchema.safeParse(deleteUserDTO);

    if (!resultUserDeletedParse.success) {

      const errorsFormat = formatZodError(resultUserDeletedParse);

      throw new Error(`Error to parse user: ${errorsFormat}`);
    }

    return resultUserDeletedParse.data;

  };

  return {
    validate,
  };
};