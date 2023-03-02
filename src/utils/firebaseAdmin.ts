import { credential } from "firebase-admin";
import { initializeApp, getApps } from "firebase-admin/app";
import { env } from "~/env.mjs";

export const initFirebaseAdmin = () => {
  if (getApps().length === 0) {
    initializeApp({
      credential: credential.cert({
        projectId: env.FIREBASE_PROJECT_ID,
        privateKey: env.FIREBASE_PRIVATE_KEY,
        clientEmail: env.FIREBASE_CLIENT_EMAIL,
      }),
    });
  }

  return getApps()[0];
};
