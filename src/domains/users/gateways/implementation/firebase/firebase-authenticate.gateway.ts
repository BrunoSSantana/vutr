import admin from "firebase-admin";

import { AuthenticateDTO, AuthenticateResponse, IAuthenticatorGateway } from "@/domains/users/gateways/types";

export const FirebaseAuthenticatorGateway: IAuthenticatorGateway = {
  authenticate: async function (authenticateDTO: AuthenticateDTO): Promise<AuthenticateResponse> {

    const { token } = authenticateDTO;
    console.log("token", token);

    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log("decodedToken", decodedToken);

    return {
      externalId: decodedToken.uid,
      email: decodedToken.email,
    };
  }
}