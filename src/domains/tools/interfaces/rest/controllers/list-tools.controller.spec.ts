import { PrismaClient, User } from "@prisma/client";

import { describe, it, afterAll, beforeAll, expect, afterEach } from "vitest";
import request from "supertest";

import { env } from "@/env";
import { getTokenFromFirebase } from "@/utils";
import { app } from "@/infra/rest/fastify-server";


describe("List Tool", () => {
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
    await prisma.user.deleteMany();
  })

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should be able to list a tool", async () => {

    const data = {
      title: "fastify",
      link: "https://www.fastify.io/",
      description:
        "Extremely fast and simple, low-overhead web framework for NodeJS. Supports HTTP2.",
    }

    await prisma.tool.create({
      data,
    });

    const { token } = await getTokenFromFirebase();

    request(app.server).get('/tools').set({
      authorization: `Bearer ${token}`
    }).expect(200);

  });

  it("should not be able to delete a tool that does not exist", async () => {
    // TODO: implement test to pagination
  });
});