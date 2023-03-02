// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxZEzz14qRGfIPj05gLDsOBxx6Qe10CJk",
  authDomain: "stadium-mate.firebaseapp.com",
  projectId: "stadium-mate",
  appId: "1:940132202945:web:d94ac46c12a624a9909740",
};

export const initFirebase = () => {
  if (getApps().length === 0) {
    return initializeApp(firebaseConfig);
  }

  return getApps()[0];
};
