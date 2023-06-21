import { beforeEach, describe, expect, it, vi } from "vitest";

import { FastifyRequest, FastifyReply } from "fastify";

import { createUserUseCaseBuild } from "@/domains/users/usecases";
import { IUserRepository, InMemoryUserRepository } from "@/domains/users/repositories";
import { createUserController } from "@/domains/users/interfaces/rest/controllers/create-user.controller";
import { buildCreateUserValidation } from "@/domains/users/validation/implementations/zod/create-user.validation";

const makeSut = () => {

  const repository = InMemoryUserRepository;
  const buildUseCase = createUserUseCaseBuild;
  const buildValidation = buildCreateUserValidation;

  const repositoryCreateSpy = vi.spyOn(repository, "create");

  const sut = createUserController(
    repository,
    buildUseCase,
    buildValidation
  );


  return {
    sut,
    repositoryCreateSpy
  }
}

describe("createUserController", () => {


  const mockReply = {
    status: vi.fn().mockReturnThis(),
    send: vi.fn(),
  } as unknown as FastifyReply;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return a new user when given valid input", async () => {
    const mockRequest: FastifyRequest = { body: {
      name: "name",
      email: "valid-email@bruno.com",
      externalId: "externalId",
      bio: "bio",
    }} as FastifyRequest;

    const { sut,repositoryCreateSpy } = makeSut();


    await sut(mockRequest, mockReply);

    expect(mockReply.send).toHaveBeenCalled();
    expect(repositoryCreateSpy).toHaveBeenCalled();
    expect(mockReply.status).toHaveBeenCalledWith(201);
  });
});