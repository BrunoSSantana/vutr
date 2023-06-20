import { env } from "@/env";
import admin from "firebase-admin";


export const bootFirebase = () => {
  const serviceAccount = {
    clientEmail: env.FIREBASE_CLIENT_EMAIL,
    privateKey: env.FIREBASE_PRIVATE_KEY,
    projectId: env.FIREBASE_PROJECT_ID,
  };

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: env.FIREBASE_DATABASE_URL,
  });
  console.log("Firebase booted");
};
