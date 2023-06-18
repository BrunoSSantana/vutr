import {
  User,
  CreateUserDTO,
  ListUsersDTO,
  UpdateUserDTO,
} from "@/domains/users/entities/user.entity";

export type IUserRepository = {
  create: (createUserDTO: CreateUserDTO) => Promise<User>;
  update: (updateUserDTO: UpdateUserDTO) => Promise<User>;
  findByExternalId: (externalId: string) => Promise<User>;
  list: (listUserDTO: ListUsersDTO) => Promise<User[]>;
  delete: (id: number) => Promise<void>;
  deleteAll: () => Promise<void>;
};
