import { ListUsersDTO, User } from "@/domains/users/entities";
import { IFieldResolver } from "@/infra/graphql/resolvers";
import { IUserRepository } from "@/domains/users/repositories";
import { IBuildListUsersUseCase } from "@/domains/users/usecases";
import { IListUsersValidation } from "@/domains/users/validation/types";

type ListUsersResolver = IFieldResolver<
  User,
  ListUsersDTO,
  { users: User[] }
>

export const listUsersResolver =
  (
    listUsersRepository: IUserRepository,
    buildListUsersUseCase: IBuildListUsersUseCase,
    listUsersValidation: IListUsersValidation
  ): ListUsersResolver =>
    async (_parent, args, _contextValue, _info) => {
      const params = listUsersValidation().validate(args);

      const users = await buildListUsersUseCase(listUsersRepository)(params);

      return { users };
    };
