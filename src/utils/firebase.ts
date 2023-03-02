// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { env } from "~/env.mjs";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: env.NEXT_PUBLIC_FIREBASE_APP_ID,
  projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const initFirebase = () => {
  if (getApps().length === 0) {
    return initializeApp(firebaseConfig);
  }

  return getApps()[0];
};
