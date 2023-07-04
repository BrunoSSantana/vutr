import { DeleteUserDTO, User } from "@/domains/users/entities";
import { IFieldResolver } from "@/infra/graphql/resolvers";
import { IUserRepository } from "@/domains/users/repositories";
import { IBuildDeleteUserUseCase } from "@/domains/users/usecases";
import { IDeleteUserValidation } from "@/domains/users/validation/types";

type DeleteUserResolver = IFieldResolver<
  User,
  DeleteUserDTO,
  void
>

export const deleteUserResolver =
  (
    deleteUserRepository: IUserRepository,
    buildDeleteUserUseCase: IBuildDeleteUserUseCase,
    deleteUserValidation: IDeleteUserValidation
  ): DeleteUserResolver =>
  async (_parent, args, _contextValue, _info) => {
    const params = deleteUserValidation().validate(args);

    await buildDeleteUserUseCase(deleteUserRepository)(params);
  };
