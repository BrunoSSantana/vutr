import request from "supertest";
import { describe, it, afterAll, beforeAll } from "vitest";
import { app } from "@/app";

describe("Create Tool", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a tool", async () => {
    await request(app.server)
      .post("/tool")
      .send({
        title: "fastify",
        link: "https://www.fastify.io/",
        description:
          "Extremely fast and simple, low-overhead web framework for NodeJS. Supports HTTP2.",
        tags: ["node", "framework", "http2", "https"],
      }).expect(201);

  });
});
