import { PrismaClient } from "@prisma/client";

import { userParse } from "@/domains/users/entities/user-parse";
import { IUserRepository } from "@/domains/users/repositories/types";
import { CreateUserDTO, User, UpdateUserDTO, ListUsersDTO } from "@/domains/users/entities";

export class PrismaUserRepository implements IUserRepository {
  private readonly prismaClient = new PrismaClient();

  async create(createUserDTO: CreateUserDTO): Promise<void> {
    try {
      await this.prismaClient.user.create({
        data: createUserDTO,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Error to create user");
    }
  }
  async update(updateUserDTO: UpdateUserDTO): Promise<User> {
    try {
      const user = await this.prismaClient.user.update({
        where: { id: updateUserDTO.id },
        data: updateUserDTO,
      });

      return userParse(user);

    } catch (error) {
      throw new Error("Error to update user");
    }
  }
  async findByExternalId(externalId: string): Promise<User | null> {
    try {
      const user = await this.prismaClient.user.findUnique({
        where: { externalId },
      });

      if (!user) {
        return null;
      }

      return userParse(user);

    } catch (error) {
      throw new Error("Error to find user");
    }
  }
  async list(listUserDTO: ListUsersDTO): Promise<User[]> {
    try {
      const { search, page = 1, limit = 10 } = listUserDTO;

      const users = await this.prismaClient.user.findMany({
        where: {
          name: {
            contains: search,
            mode: "insensitive",
          },
          email: {
            contains: search,
            mode: "insensitive",
          },
        },
        skip: (page - 1) * limit,
        take: limit,
      });

      return users.map(userParse);

    } catch (error) {
      throw new Error("Error to list users");
    }
  }
  async delete(id: number): Promise<void> {
    try {
      await this.prismaClient.user.delete({
        where: { id },
      });

    } catch (error) {
      throw new Error("Error to delete user");
    }
  }
  async deleteAll(): Promise<void> {
    try {
      await this.prismaClient.user.deleteMany();

    } catch (error) {
      throw new Error("Error to delete all users");
    }
  }
}