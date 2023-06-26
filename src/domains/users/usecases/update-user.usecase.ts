import { UpdateUserDTO } from "@/domains/users/entities";
import { IUserRepository } from "@/domains/users/repositories/types";

export type UpdateUserUseCase = (updateUserDTO: UpdateUserDTO) => Promise<void>;

export type IBuildUpdateUserUseCase = (
  userRepository: IUserRepository
) => UpdateUserUseCase;

export const updateUserUseCaseBuild: IBuildUpdateUserUseCase =
  (userRepository) => async (updateUserDTO) => {
    try {
    await userRepository.update(updateUserDTO);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }