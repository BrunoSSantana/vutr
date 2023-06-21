import { CreateUserDTO, User } from "@/domains/users/entities";
import { IFieldResolver } from "@/infra/graphql/resolvers";
import { IUserRepository } from "@/domains/users/repositories";
import { IBuildCreateUserUseCase } from "@/domains/users/usecases";
import { ICreateUserValidation } from "@/domains/users/validation/types";

type CreateUserResolver = IFieldResolver<
  User,
  CreateUserDTO,
  void
>

export const createUserResolver =
  (
    createUserRepository: IUserRepository,
    buildCreateUserUseCase: IBuildCreateUserUseCase,
    createUserValidation: ICreateUserValidation
  ): CreateUserResolver =>
  async (_parent, args, _contextValue, _info) => {
    const params = createUserValidation().validate(args);

    await buildCreateUserUseCase(createUserRepository)(params);
  };
