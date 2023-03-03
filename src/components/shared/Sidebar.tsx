import {
  Button,
  List,
  ListIcon,
  ListItem,
  Stack,
  Switch,
  Text,
} from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { type FC } from "react";
import { BsGoogle } from "react-icons/bs";
import useIsMatchMode from "~/hooks/useIsMatchMode";
import { clsx } from "clsx";

type SidebarItem = {
  label: string;
  route: string;
  icon: string;
  isMatchMode: boolean;
};

const items: SidebarItem[] = [
  {
    label: "Feed",
    route: "/feed",
    icon: "/icons/cricket.svg",
    isMatchMode: false,
  },
  {
    label: "Watch Party",
    route: "/watchparty",
    icon: "/icons/experience.svg",
    isMatchMode: false,
  },
  {
    label: "voice",
    route: "https://voice-stadiummate.vercel.app/",
    icon: "/icons/mic.svg",
    isMatchMode: false,
  },
  {
    label: "experience",
    route: "/engagement",
    icon: "/icons/experience.svg",
    isMatchMode: true,
  },
  {
    label: "moments",
    route: "/NFT",
    icon: "/icons/nft.svg",
    isMatchMode: true,
  },
];

const Sidebar: FC = () => {
  const [isMatchMode, setIsMatchMode] = useIsMatchMode();

  const { data: session } = useSession();

  const itemsToRender = items.filter(
    (item) => item.isMatchMode === isMatchMode
  );

  //turn box red when isMachedMode is true
  const bgColor = isMatchMode ? "bg-red-400" : "bg-gray-100";

  return (
    <div>
      <nav
        className={`${
          isMatchMode
            ? "fixed top-0 left-0 hidden h-screen overflow-auto  bg-[#DC3546] md:w-[17vw] md:min-w-[17vw] lg:block lg:w-[17vw] lg:min-w-[17vw]"
            : "fixed top-0 left-0 hidden h-screen overflow-auto bg-[#7267CB] md:w-[17vw] md:min-w-[17vw] lg:block lg:w-[17vw] lg:min-w-[17vw]"
        }`}
      >
        <div className="flex flex-row items-center" id="logo">
          <div className="flex h-20 w-20 items-center justify-center rounded-full  ">
            <Image src="/icons/logo.svg" alt="logo" width={50} height={50} />
          </div>
          {isMatchMode ? (
            <p className="mx-2 font-medium text-white">MatchMode</p>
          ) : (
            ""
          )}
        </div>
        <div>
          <div className="ml-4 text-white">
            {isMatchMode ? "Match Mode" : "Normal Mode"}
            <Switch
              ml={2}
              onChange={() => {
                setIsMatchMode(!isMatchMode);
              }}
            />
          </div>

          <List mt={4}>
            {itemsToRender.map((item) => {
              return (
                <Link
                  passHref
                  href={{
                    pathname: item.route,
                    query: isMatchMode ? { mode: "match" } : {},
                  }}
                  key={item.route}
                >
                  <ListItem
                    className={clsx(
                      isMatchMode
                        ? "mx-2 flex cursor-pointer items-center rounded-md px-2 py-4 text-white hover:bg-red-400"
                        : "mx-2 flex cursor-pointer items-center rounded-md px-2 py-4 text-white hover:bg-indigo-400"
                    )}
                  >
                    <ListIcon
                      as={() => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.icon}
                          alt="Watch Party Icon"
                          className="mr-4 h-6 w-6"
                        />
                      )}
                    />
                    <span>{item.label}</span>
                  </ListItem>
                </Link>
              );
            })}
          </List>
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
                onClick={() => void signOut()}
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
                onClick={() => void signIn("google")}
                leftIcon={<BsGoogle />}
              >
                Login with Google
              </Button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
