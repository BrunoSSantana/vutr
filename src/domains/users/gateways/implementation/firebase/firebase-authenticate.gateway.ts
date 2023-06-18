import admin from "firebase-admin";

import { AuthenticateDTO, AuthenticateResponse, IAuthenticatorGateway } from "@/domains/users/gateways/types";

export const FirebaseAuthenticatorGateway: IAuthenticatorGateway = {
  authenticate: async function (authenticateDTO: AuthenticateDTO): Promise<AuthenticateResponse> {

    const { token } = authenticateDTO;

    const decodedToken = await admin.auth().verifyIdToken(token);

    return {
      externalId: decodedToken.uid,
      email: decodedToken.email,
    };
  }
}