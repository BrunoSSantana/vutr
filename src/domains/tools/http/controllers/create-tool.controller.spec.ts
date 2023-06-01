import { describe, it, afterAll, beforeAll, afterEach, expect } from "vitest";
import request from "supertest";

import { PrismaClient, User } from "@prisma/client";
import { getTokenFromFirebase } from "@/utils";
import { env } from "@/env";
import { app } from "@/infra/rest/fastify-server";

describe("Create Tool", () => {
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

  it("should be able to create a tool", async () => {
    const { token } = await getTokenFromFirebase();

    request(app.server).post('/tool').send({
      title: "fastify",
      link: "https://www.fastify.io/",
      description: "Extremely fast.",
    }).set({
      authorization: `Bearer ${token}`
    }).expect(201);

  });
});


