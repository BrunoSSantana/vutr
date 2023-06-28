import { CreateUserDTO, DeleteUserDTO, ListUsersDTO, UpdateUserDTO } from "@/domains/users/entities";

export type Context<TBody = unknown, TParams = unknown, TQuerystring = unknown> = {
  Body: TBody;
  Params: TParams;
  Querystring: TQuerystring;

  user?: {
    id: string;
    email: string;
  }
};

export type UpdateUserRequest = Context<Omit<UpdateUserDTO, 'id'>>;
export type DeleteUserRequest = Context<unknown, DeleteUserDTO>;
export type CreateUserRequest = Context<Omit<CreateUserDTO, 'email'>>;
export type ListUsersRequest = Context<unknown, unknown, ListUsersDTO>;