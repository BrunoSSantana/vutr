import { ICreateUserValidation } from "@/domains/users/validation/types";
import { userRegisterSchema } from "@/domains/users/validation/implementations/zod/user.schema";
import { object } from "zod";
type ErrorZod = {
  _errors: string;
}

export const buildCreateUserValidation: ICreateUserValidation = <Type>() => {
  const validate = (createUserDTO: Type) => {

    const resultUserRegisterParse = userRegisterSchema.safeParse(createUserDTO);

    if (!resultUserRegisterParse.success) {
      const errors = Object.entries(resultUserRegisterParse.error.format()).map(([key, value]) => {
        if (!Array.isArray(value)) {
          const error = value._errors;
          if (error) {
            return `${key}: ${value._errors}`;
          }
        }
      }).filter((error) => error).join('::');

      throw new Error(errors);
    }

    return resultUserRegisterParse.data;

  };

  return {
    validate,
  };
};