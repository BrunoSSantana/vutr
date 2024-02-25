import { DeleteUserDTO } from "@/domains/users/entities";
import { IUserRepository } from "@/domains/users/repositories/types";

export type DeleteUserUseCase = (
  deleteUsersDTO: DeleteUserDTO
) => Promise<void>;

export type IBuildDeleteUserUseCase = (
  userRepository: IUserRepository
) => DeleteUserUseCase;

export const deleteUserUseCaseBuild: IBuildDeleteUserUseCase =
  (userRepository) => async (deleteUserDTO) => {
    try {
      await userRepository.delete(deleteUserDTO.userId);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };
