import { PrismaClient, User } from "@prisma/client";

import { describe, it, afterAll, beforeAll, afterEach, expect } from "vitest";
import request from "supertest";

import { getTokenFromFirebase } from "@/utils";
import { env } from "@/env";
import { app } from "@/infra/rest/fastify-server";


describe("Delete Tool", () => {
  let prisma: PrismaClient;
  let user: User;

  beforeAll(async () => {
    prisma = new PrismaClient();
    await prisma.$connect();

    user = await prisma.user.create({
      data: {
        email: env.FIREBASE_USER,
        name: "Test User",
        externalId: env.FIREBASE_ID,
      },
    });
  });

  afterEach(async () => {
    await prisma.tool.deleteMany();
  })

  afterAll(async () => {
    await prisma.user.deleteMany();
    await prisma.$disconnect();
  });

  it("should be able to delete a tool", async () => {
    const { token } = await getTokenFromFirebase();

    const toolCreated = await prisma.tool.create({
      data: {
        title: "fastify",
        link: "https://www.fastify.io/",
        description:
          "Extremely fast and simple, low-overhead web framework for NodeJS. Supports HTTP2.",
      },
    });

    request(app.server).delete(`/tool/${toolCreated.id}`).set({
      authorization: `Bearer ${token}`
    }).expect(204);

  });

  it("should not be able to delete a tool that does not exist", async () => {
    const { token } = await getTokenFromFirebase();


    request(app.server).delete(`/tool/1`).set({
      authorization: `Bearer ${token}`
    }).expect(404);


  });
});