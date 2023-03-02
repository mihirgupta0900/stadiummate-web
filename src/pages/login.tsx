import React, { useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { Button } from "@chakra-ui/react";
import { useAuthState, useIdToken } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import Image from "next/image";
import { BsGoogle } from "react-icons/bs";
const Login = () => {
  const [isWindow, setIsWindow] = useState(false);
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const router = useRouter();

  const login = async () => {
    const result = await signInWithPopup(auth, provider);
    if (result.user) {
      await router.push("/update");
    } else {
      console.log("error");
    }

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

  if (typeof window !== "undefined") {
    if (window.innerWidth < 500) {
      setIsWindow(true);
    }
  }

  return (
    <main className="login-bg flex h-screen w-screen flex-row  ">
      <section className="flex  md:w-3/4 md:flex-col md:items-center md:justify-center">
        <Image src="/icons/logo.svg" alt="logo" width={100} height={100} />

        <h1
          className=" my-4 text-3xl font-medium text-white
        "
        >
          StadiumMate
        </h1>
        <p className=" italic text-white">
          “A must have app for cricket fans, No matter if you are going to the
          match or not”
        </p>
      </section>
      <div className="h-full w-screen bg-white md:w-1/4 lg:w-1/4">
        {isWindow ? (
          <Image src="/icons/logo2.svg" alt="logo" width={100} height={100} />
        ) : null}
        <button
          className="flex h-12 w-3/4 flex-row items-center justify-center gap-4 rounded-2xl bg-[#7267CB] font-medium text-white"
          onClick={() => {
            login().catch((error) => console.log(error));
          }}
        >
          <BsGoogle /> Login with Google
        </button>
      </div>
    </main>
  );
};

export default Login;
