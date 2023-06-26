import { User } from "../entities";
import { IUserRepository } from "../repositories/types";
import { AuthenticateDTO, IAuthenticatorGateway } from "../gateways/types";


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

    return user;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }