import React, { FC, useState } from "react";
import {
  Switch,
  FormControl,
  FormLabel,
  Stack,
  Text,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { useSession } from "next-auth/react";
const Sidebar: FC = () => {
  const [isMatchMode, setIsMatchMode] = useState(false);

  const nonMatchModeRoutes = [
    ["Feed", "/update", "/icons/cricket.svg"],
    ["experience", "/watchparty", "/icons/experience.svg"],
    ["voice", "https://voice-stadiummate.vercel.app/", "/icons/mic.svg"],
    // ["profile", "/profile", "/icons/profile.svg"],
  ] as const;

  const matchModeRoutes = [
    ["experience", "/engagement", "/icons/experience.svg"],
    ["moments", "/NFT", "/icons/nft.svg"],
    ["profile", "/profile", "/icons/profile.svg"],
  ] as const;

  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div>
      <nav className="fixed top-0 left-0 hidden h-screen overflow-auto bg-[#7267CB] md:w-[17vw] md:min-w-[17vw] lg:block lg:w-[17vw] lg:min-w-[17vw]">
        <div id="logo">
          <div className="flex h-20 w-20 items-center justify-center rounded-full  ">
            <Image src="/icons/logo.svg" alt="logo" width={50} height={50} />
          </div>
        </div>
        <div>
          <div className="ml-4 text-white">
            {/* <button className=""> */}
            {isMatchMode ? "Match Mode" : "Normal Mode"}
            <Switch
              ml={2}
              onChange={() => {
                setIsMatchMode(!isMatchMode);
              }}
            />
          </div>
          {/* </button> */}
          <ul>
            {isMatchMode
              ? matchModeRoutes.map(([route, link, img]) => (
                  <li
                    key={route}
                    className="flex cursor-pointer flex-row items-center gap-4  px-6 py-4 text-white hover:bg-white/40 hover:text-[#7267CB]"
                  >
                    <img src={img} className="h-6 w-6" />
                    <Link href={link}>{route}</Link>
                  </li>
                ))
              : nonMatchModeRoutes.map(([route, link, img]) => (
                  <li
                    key={route}
                    className="flex cursor-pointer flex-row items-center gap-4  px-6 py-4  text-white hover:bg-white/40 hover:text-[#5a44ff]"
                  >
                    <img src={img} className="h-6 w-6" />
                    <Link href={link}>
                      <p className=" font-medium ">{route}</p>
                    </Link>
                  </li>
                ))}
          </ul>
          {session ? (
            <div className="mx-4">
              <Stack color="white" mt={4}>
                <Text fontSize={"lg"}>{session.user.name}</Text>
                <Text fontSize={"sm"}>{session.user.email}</Text>
              </Stack>
              <Button
                variant="outline"
                mt={4}
                color="white"
                width={"full"}
                _hover={{
                  bg: "none",
                }}
                onClick={() => void router.push("/api/auth/signout")}
              >
                Signout
              </Button>
            </div>
          ) : (
            <div className="mx-4">
              <Button
                variant="outline"
                mt={4}
                color="white"
                width={"full"}
                _hover={{
                  bg: "none",
                }}
                onClick={() => void router.push("/api/auth/signin")}
              >
                Login
              </Button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
