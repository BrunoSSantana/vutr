import admin from "firebase-admin";
import { FastifyInstance } from "fastify";

export async function firestoreRoutes(app: FastifyInstance) {
  app.post("/firestore", async (req, reply) => {
    const { data } = req.body as any;

    const db = admin.firestore();

    await db.collection("users").add(data);

    reply.send({ success: true }).status(201);
  });

  app.get("/firestore", async (req, reply) => {
    const db = admin.firestore();

    const dataFromCollection = (await db.collection("users").get()).docs.map(
      (doc) => doc.data()
    );

    reply.send({ data: dataFromCollection });
  });

  app.get("/", async (req, reply) => {
    reply.send({ ok: true });
  });
}
