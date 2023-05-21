import request from "supertest";
import { describe, it, afterAll, beforeAll, afterEach } from "vitest";
import { app } from "@/infra/rest/fastify-server";
import { PrismaClient } from "@prisma/client";

describe("Create Tool", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterEach(async () => {
    const prisma = new PrismaClient();
    await prisma.tool.deleteMany();
  })

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a tool", async () => {
    await request(app.server)
      .post("/tool")
      .send({
        title: "fastify",
        link: "https://www.fastify.io/",
        description: "Extremely fast.",
      })
      .expect(201);
  });
});
