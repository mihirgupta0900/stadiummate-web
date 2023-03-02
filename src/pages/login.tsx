import React from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { Button } from "@chakra-ui/react";
import { useAuthState, useIdToken } from "react-firebase-hooks/auth";

const Login = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const login = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
  };

  const [user, isUserLoading] = useAuthState(auth);
  console.log("🚀 ~ file: login.tsx:16 ~ Login ~ user:", user);

  const dummyAPICAll = async () => {
    if (!user) return;

    const token = await user.getIdToken();
    // console.log("🚀 ~ file: login.tsx:22 ~ dummyAPICAll ~ token:", token);
    await fetch("/api/test", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return (
    <div>
      <Button
        onClick={() => {
          login().catch((error) => console.log(error));
        }}
      >
        Login
      </Button>
      <Button
        onClick={() => {
          dummyAPICAll().catch((error) => console.log(error));
        }}
      >
        API Call
      </Button>
      <Button
        onClick={() => {
          signOut(auth).catch((error) => console.log(error));
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default Login;
