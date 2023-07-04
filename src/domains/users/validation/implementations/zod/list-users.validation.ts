import { IListUsersValidation } from "@/domains/users/validation/types";
import { userListSchema } from "@/domains/users/validation/implementations/zod/user.schema";

export const buildListUsersValidation: IListUsersValidation = <Type>() => {
  const validate = (listUserDTO: Type) => {

    const resultUserListParse = userListSchema.safeParse(listUserDTO);

    if (!resultUserListParse.success) {

      const errorsFormated = resultUserListParse.error.format()._errors.map((error) => error).join('::')
      throw new Error(errorsFormated);
    }

    return resultUserListParse.data;

  };

  return {
    validate,
  };
};