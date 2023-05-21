import admin from "firebase-admin";


export const bootFirebase = () => {
  const serviceAccount = {
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/gi, "\n"),
    projectId: process.env.FIREBASE_PROJECT_ID,
  };

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
};
