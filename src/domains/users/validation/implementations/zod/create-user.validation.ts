import { ICreateUserValidation } from "@/domains/users/validation/types";
import { userRegisterSchema } from "@/domains/users/validation/implementations/zod/user.schema";

export const buildCreateUserValidation: ICreateUserValidation = <Type>() => {
  const validate = (createUserDTO: Type) => {

    const resultUserRegisterParse = userRegisterSchema.safeParse(createUserDTO);

    if (!resultUserRegisterParse.success) {

      const errorsFormated = resultUserRegisterParse.error.format()._errors.map((error) => error).join('::')
      throw new Error(errorsFormated);
    }

    return resultUserRegisterParse.data;

  };

  return {
    validate,
  };
};