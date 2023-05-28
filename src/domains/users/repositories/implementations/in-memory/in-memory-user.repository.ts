import { CreateUserDTO, User, UpdateUserDTO, ListUsersDTO, createUser, updateUser } from "@/domains/users/entities";
import { IUserRepository } from "@/domains/users/repositories/types";

const Users: Record<number, User> = {};


export const InMemoryUserRepository: IUserRepository = {
  create: async function (createUserDTO: CreateUserDTO): Promise<User> {
    const id = Object.keys(Users).length + 1;

    const user = createUser({ id, ...createUserDTO });

    Users[id] = user;

    return Promise.resolve(user);
  },
  update: async function (updateUserDTO: UpdateUserDTO): Promise<User> {
    const user = Users[updateUserDTO.id];

    if (!user) {
      throw new Error("User not found");
    }

    const updatedUser = updateUser(
      user,
      updateUserDTO,
    );

    Users[updateUserDTO.id] = updatedUser;

    return Promise.resolve(updatedUser);
  },
  list: async function (listUserDTO: ListUsersDTO): Promise<User[]> {
    const users = Object.values(Users);

    const usersFiltereds = users.filter((user) => {
      if (listUserDTO.search) {
        const search = listUserDTO.search.toLowerCase();

        const name = user.name?.toLowerCase() ?? "";
        const email = user.email.toLowerCase();

        const hasSearch =
          name.includes(search) ||
          email.includes(search);

        return hasSearch;
      }

      return true;
    });

    const page = listUserDTO.page ?? 1;
    const limit = listUserDTO.limit ?? 10;

    return Promise.resolve(usersFiltereds.slice((page - 1) * limit, page * limit));
  },
  findByExternalId: async function (externalId: string): Promise<User> {
    const user = Object.values(Users).find((user) => user.externalId === externalId);

    if (!user) {
      throw new Error("User not found");
    }

    return Promise.resolve(user);
  },
  delete: async function (id: number): Promise<void> {

    const user = Users[id];

    if (!user) {
      throw new Error("User not found");
    }

    delete Users[id];

    return Promise.resolve();
  },
  deleteAll: function (): Promise<void> {

    Object.keys(Users).forEach((key) => {
      delete Users[Number(key)];
    });

    return Promise.resolve();
  }
}