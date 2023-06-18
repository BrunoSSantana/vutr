export type AuthenticateDTO = {
  token: string;
};

export type AuthenticateResponse = {
  externalId: string;
  email?: string;
};

export type IAuthenticatorGateway = {
  authenticate: (authenticateDTO: AuthenticateDTO) => Promise<AuthenticateResponse>;
};
