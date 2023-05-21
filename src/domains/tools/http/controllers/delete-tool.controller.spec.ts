import request from "supertest";
import { describe, it, afterAll, beforeAll } from "vitest";
import { app } from "@/infra/rest/fastify-server";
import { PrismaClient } from "@prisma/client";

describe("Delete Tool", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {

    const prisma = new PrismaClient();
    await prisma.tool.deleteMany();

    await app.close();
  });

  it("should be able to delete a tool", async () => {
    const createResponse = await request(app.server)
      .post("/tool")
      .send({
        title: "fastify",
        link: "https://www.fastify.io/",
        description:
          "Extremely fast and simple, low-overhead web framework for NodeJS. Supports HTTP2.",
      })
      .expect(201);

    // Then, delete the tool
    await request(app.server)
      .delete(`/tool/${createResponse.body.id}`)
      .expect(204);
  });

  it("should not be able to delete a tool that does not exist", async () => {
    await request(app.server)
      .delete(`/tool/123`)
      .expect(500);

  });
});