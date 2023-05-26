import { Tool } from "@/domains/tools/entities";

export type User = {
  id: number;
  name?: string;
  email: string;
  externalId?: string;
  avatar?: string;
  bio?: string;

  tools?: Tool[];

  createdAt: Date;
  updatedAt: Date;
}

export const createUser = (userDTO: CreateUserDTO & {id: number}): User => ({
  ...userDTO,
  createdAt: new Date(),
  updatedAt: new Date(),
});

export const updateUser = (user: User, updateUserDTO: UpdateUserDTO): User => ({
  ...user,
  ...updateUserDTO,
  updatedAt: new Date(),
});

export type CreateUserDTO = {
  name?: string;
  email: string;
  externalId?: string;
  bio?: string;

  createdAt?: Date;
};

export type UpdateUserDTO = {
  id: number;
  name?: string;
  email?: string;
  externalId?: string;
  bio?: string;

  updatedAt?: Date;
};

export type DeleteUserDTO = {
  userId: number;
};

export type ListUsersDTO = {
  search?: string;
  page?: number;
  limit?: number;
};

export type UserListResponse = {
  users: User[];
  total: number;
  page: number;
  limit: number;
};
