import { User } from "@/domains/users/entities";
import { IUserRepository } from "@/domains/users/repositories/types";
import { AuthenticateDTO, IAuthenticatorGateway } from "@/domains/users/gateways/types";


export type AuthenticateUseCase = (authenticateDTO: AuthenticateDTO) => Promise<User>;

export type IBuildAuthenticateUseCase = (
  authenticatorGateway: IAuthenticatorGateway,
  userRepository: IUserRepository
) => AuthenticateUseCase;

export const authenticateUseCaseBuild: IBuildAuthenticateUseCase =
  (authenticatorGateway, userRepository) => async (authenticateDTO) => {
    try {
      const { externalId } = await authenticatorGateway.authenticate(authenticateDTO);

      const user = await userRepository.findByExternalId(externalId);

      if (!user) {
        throw new Error("User not found");
      }

      return user;
    } catch (error) {

      if (error instanceof Error) {
        throw new Error(error.message);
      }

      throw new Error("Error to authenticate user");
    }
  }