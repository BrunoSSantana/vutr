import { CreateUserDTO, DeleteUserDTO, ListUsersDTO, UpdateUserDTO } from "@/domains/users/entities";

export type ICreateUserValidation = <Type>() => {
  validate: (createUserDTO: Type) => CreateUserDTO;
};

export type IUpdateUserValidation = <Type>() => {
  validate: (updateUserDTO: Type) => UpdateUserDTO;
};

export type IDeleteUserValidation = <Type>() => {
  validate: (deleteUserDTO: Type) => DeleteUserDTO;
};

export type IListUsersValidation = <Type>() => {
  validate: (listUserDTO: Type) => ListUsersDTO;
};