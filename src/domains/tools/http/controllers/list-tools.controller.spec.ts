import request from "supertest";
import { describe, it, afterAll, beforeAll, expect, beforeEach, afterEach } from "vitest";
import { app } from "@/infra/rest/fastify-server";
import { PrismaClient } from "@prisma/client";

describe("List Tool", () => {
  let prisma: PrismaClient;


  beforeAll(async () => {
    prisma = new PrismaClient();

    await app.ready();
  });

  afterEach(async () => {
    await prisma.tool.deleteMany();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to list a tool", async () => {

    const data = {
      title: "fastify",
      link: "https://www.fastify.io/",
      description:
        "Extremely fast and simple, low-overhead web framework for NodeJS. Supports HTTP2.",
    }

    const createResponse = await prisma.tool.create({
      data,
    });
    
    const toolsListeds = await request(app.server)
      .get(`/tools`);

    console.log({ body: toolsListeds.body })

    expect(toolsListeds.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: createResponse.id,
          ...data
        })
      ])
    );

    expect(toolsListeds.body).toHaveLength(1);


  });

  it("should not be able to delete a tool that does not exist", async () => {
    // TODO: implement test to pagination
  });
});