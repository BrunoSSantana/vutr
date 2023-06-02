import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from "fastify";

import { AuthentificationFastify, authentificationBuilder } from "./firebase-authentication";
import { bootFirebase } from "@/infra/repositories/firebase/firestore";

const makeSut = () => {
  const authentificationUseCaseSpy = vi.fn();
  const sut = authentificationBuilder(authentificationUseCaseSpy)

  return { sut, authentificationUseCaseSpy };
}

describe("authentification", () => {
  let request: FastifyRequest;
  let reply: FastifyReply;
  let next: HookHandlerDoneFunction;

  beforeAll(() => {
    bootFirebase()
  });


  beforeEach(() => {
    request = {} as FastifyRequest;
    reply = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    } as unknown as FastifyReply;
    next = vi.fn();
  });

  it("should return 401 if no token is provided", async () => {
    // Arrange
    request.headers = {};

    const { sut } = makeSut();

    // Act
    await sut(request, reply, next);

    // Assert
    expect(reply.status).toHaveBeenCalledWith(401);
    expect(reply.send).toHaveBeenCalledWith({ message: "Unauthorized" });
  });

  it("should return 403 if authentication fails", async () => {
    // Arrange

    request.headers = { authorization: "Bearer invalid-token" };

    const { sut, authentificationUseCaseSpy } = makeSut();

    // Act
    authentificationUseCaseSpy.mockRejectedValueOnce(new Error("Invalid token"));
    const response = await sut(request, reply, next);


    // Assert
    expect(reply.status).toHaveBeenCalledWith(403);
    expect(reply.send).toHaveBeenCalledWith({ message: "Forbidden", error: new Error("Invalid token") });
  });

  it("should set the user on the request if authentication succeeds", async () => {
    // Arrange

    request.headers = { authorization: "Bearer valid-token" };
    const user = { id: "user-id", name: "John Doe" };

    const { sut, authentificationUseCaseSpy } = makeSut();

    // Act
    authentificationUseCaseSpy.mockResolvedValueOnce(user);
    await sut(request, reply, next);

    // Assert
    expect(request.user).toBe(user);
    expect(next).toHaveBeenCalled();
  });
});