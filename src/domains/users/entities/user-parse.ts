import { User } from "@/domains/users/entities";
import { userSchema } from "@/domains/users/validation/implementations/zod/user.schema";

export const userParse = (user: unknown): User => {

  const userValidated = userSchema.safeParse(user);

  if (userValidated.success) {
    return userValidated.data;
  }

  throw new Error(userValidated.error.message);
}