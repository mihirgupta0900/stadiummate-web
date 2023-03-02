import React, { FC, useState } from "react";
import { Switch, FormControl, FormLabel } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
const Sidebar: FC = () => {
  const [isMatchMode, setIsMatchMode] = useState(false);
  const router = useRouter();

  const nonMatchModeRoutes = [
    ["Feed", "/update", "/icons/cricket.svg"],
    ["experience", "/watchparty", "/icons/experience.svg"],
    ["voice", "/voice", "/icons/mic.svg"],
    ["profile", "/profile", "/icons/profile.svg"],
  ];

  const matchModeRoutes = [
    ["experience", "/engagement", "/icons/feed.svg"],
    ["moments", "/NFT", "/icons/nft.svg"],
    ["profile", "/profile", "/icons/profile.svg"],
  ];

  return (
    <div>
      <nav className=" fixed  h-screen bg-[#7267CB] md:w-[17vw] md:min-w-[17vw] lg:w-[17vw] lg:min-w-[17vw] ">
        <div id="logo">
          <div className="flex h-20 w-20 items-center justify-center rounded-full  ">
            <Image src="/icons/logo.svg" alt="logo" width={50} height={50} />
          </div>
        </div>
        <div>
          <button className="">
            <Switch
              onChange={() => {
                setIsMatchMode(!isMatchMode);
              }}
            />
          </button>
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
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
