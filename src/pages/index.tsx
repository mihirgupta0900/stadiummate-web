import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { BsGoogle } from "react-icons/bs";

const Login = () => {
  const router = useRouter();
  const { data: user } = useSession();

  useEffect(() => {
    if (user) {
      void router.push("/watchparty");
    }
  }, [router, user]);

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
          onClick={() => void router.push("/api/auth/signin")}
        >
          <span className="ml-1">Login</span>
        </button>
      </section>
    </main>
  );
};

export default Login;
