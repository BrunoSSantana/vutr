import { CreateUserDTO } from "@/domains/users/entities";
import { IUserRepository } from "@/domains/users/repositories/types";

export type CreateUserUseCase = (createUserDTO: CreateUserDTO) => Promise<void>;

export type IBuildCreateUserUseCase = (
  userRepository: IUserRepository
) => CreateUserUseCase;

export const createUserUseCaseBuild: IBuildCreateUserUseCase =
  (userRepository) => async (createUserDTO) => {
    try {
    await userRepository.create(createUserDTO);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }