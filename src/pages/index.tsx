import { getAuth } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { BsGoogle } from "react-icons/bs";
const Login = () => {
  const auth = getAuth();
  const router = useRouter();

  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) void router.push("/update");
  }, [user, router]);

  return (
    <main className="login-bg flex h-screen w-screen flex-row  ">
      <section className="mx-auto flex flex-col items-center justify-center">
        <Image src="/icons/logo.svg" alt="logo" width={100} height={100} />
        <h1 className=" my-4 text-3xl font-medium text-white">StadiumMate</h1>
        <p className=" italic text-white">
          “A must have app for cricket fans, No matter if you are going to the
          match or not”
        </p>

        <button
          className="mt-2 flex items-center justify-center rounded-lg bg-white px-4 py-2 text-xl font-medium text-[#7267CB]"
          onClick={() => signInWithGoogle()}
        >
          <BsGoogle className="mr-1" />
          <span className="ml-1">Login with Google</span>
        </button>
      </section>
    </main>
  );
};

export default Login;
