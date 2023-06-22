import { ListUsersDTO, User } from "@/domains/users/entities";
import { IUserRepository } from "@/domains/users/repositories/types";

export type ListUsersUseCase = (listUsersDTO: ListUsersDTO) => Promise<User[]>;

export type IBuildListUsersUseCase = (
  userRepository: IUserRepository
) => ListUsersUseCase;

export const listUsersUseCaseBuild: IBuildListUsersUseCase =
  (userRepository) => async (listUsersDTO) => {
    try {
      return userRepository.list(listUsersDTO);
    } catch (error) {
      throw new Error((error as string));
    }
  }