import admin from "firebase-admin";

import { AuthenticateDTO, AuthenticateResponse, IAuthenticatorGateway } from "@/domains/users/gateways/types";

export const FirebaseAuthenticatorGateway: IAuthenticatorGateway = {
  authenticate: async function (authenticateDTO: AuthenticateDTO): Promise<AuthenticateResponse> {

    const { token } = authenticateDTO;
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);

      if (!decodedToken.email) {
        throw new Error("Email not found in token");
      }

      return {
        externalId: decodedToken.uid,
        email: decodedToken.email,
      };
    } catch (error) {

      if (error instanceof Error) {
        throw new Error(error.message);
      }

      throw new Error("Error to authenticate user");
    }
  }
}