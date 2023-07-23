import {
  User,
  CreateUserDTO,
  ListUsersDTO,
  UpdateUserDTO,
} from "@/domains/users/entities/user.entity";

export interface IUserRepository {
  create: (createUserDTO: CreateUserDTO) => Promise<void>;
  update: (updateUserDTO: UpdateUserDTO) => Promise<User>;
  findByExternalId: (externalId: string) => Promise<User | null>;
  list: (listUserDTO: ListUsersDTO) => Promise<User[]>;
  delete: (id: number) => Promise<void>;
  deleteAll: () => Promise<void>;
}
