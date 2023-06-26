import { UpdateUserDTO, User } from "@/domains/users/entities";
import { IFieldResolver } from "@/infra/graphql/resolvers";
import { IUserRepository } from "@/domains/users/repositories";
import { IBuildUpdateUserUseCase } from "@/domains/users/usecases";
import { IUpdateUserValidation } from "@/domains/users/validation/types";

type UpdateUserResolver = IFieldResolver<
  User,
  UpdateUserDTO,
  void
>

export const updateUserResolver =
  (
    updateUserRepository: IUserRepository,
    buildUpdateUserUseCase: IBuildUpdateUserUseCase,
    updateUserValidation: IUpdateUserValidation
  ): UpdateUserResolver =>
  async (_parent, args, _contextValue, _info) => {
    const params = updateUserValidation().validate(args);

    await buildUpdateUserUseCase(updateUserRepository)(params);
  };
