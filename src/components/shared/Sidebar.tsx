import {
  Button,
  FormControl,
  FormErrorMessage,
  Heading,
  List,
  ListIcon,
  ListItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Stack,
  Switch,
  Text,
  useDisclosure,
  useToast,
  type UseDisclosureReturn,
} from "@chakra-ui/react";
import { clsx } from "clsx";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { type FC } from "react";
import { BsGoogle } from "react-icons/bs";
import useIsMatchMode from "~/hooks/useIsMatchMode";
import useLoggedInUser from "~/hooks/useLoggedInUser";

import { z } from "zod";
import { api } from "~/utils/api";
import { useZodForm } from "~/utils/form";

import { ExternalLinkIcon } from "@chakra-ui/icons";
import { ethers } from "ethers";
import "react-datepicker/dist/react-datepicker.css";
import useTokenBalance from "~/hooks/useTokenBalance";
import { CustomInput } from "~/pages/watchparty";

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
  const { onOpen, ...rest } = useDisclosure({ defaultIsOpen: false });

  const { data: session } = useSession();
  const { data: user } = useLoggedInUser();
  const { data: balance, isLoading: isBalanceLoading } = useTokenBalance();

  const itemsToRender = items.filter(
    (item) => item.isMatchMode === isMatchMode
  );

  return (
    <div>
      <nav
        className={`${
          isMatchMode
            ? "fixed top-0 left-0 hidden h-screen overflow-auto  bg-[#DC3546] md:w-[17vw] md:min-w-[17vw] lg:block lg:w-[17vw] lg:min-w-[17vw]"
            : "fixed top-0 left-0 hidden h-screen overflow-auto bg-[#7267CB] md:w-[17vw] md:min-w-[17vw] lg:block lg:w-[17vw] lg:min-w-[17vw]"
        }`}
      >
        <div id="logo">
          <div className="flex h-20 w-20 items-center justify-center rounded-full  ">
            <Image src="/icons/logo.svg" alt="logo" width={50} height={50} />
          </div>
        </div>
        <div>
          <div className="ml-4 text-white">
            {isMatchMode ? "Match Mode" : "Normal Mode"}
            <Switch
              ml={2}
              isChecked={isMatchMode}
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
                    query: isMatchMode ? { match: "1" } : { match: "0" },
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
                {user?.walletAddress && (
                  <>
                    <Text fontSize={"sm"} isTruncated>
                      {user.walletAddress}
                    </Text>
                    {isBalanceLoading || !balance ? (
                      <Skeleton height={4} />
                    ) : (
                      <Text fontSize={"sm"} className="flex items-center">
                        Loyalty Points: {(balance / BigInt(1e18)).toString()}
                        <a
                          href={`https://mumbai.polygonscan.com/token/0xaf6c09e7fc621add9f03279814e9db7e2aac0ea2?a=${user.walletAddress}`}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          <ExternalLinkIcon className="ml-2" />
                        </a>
                      </Text>
                    )}
                  </>
                )}
              </Stack>
              {user?.walletAddress ? null : (
                <>
                  <Button
                    variant="outline"
                    mt={4}
                    color="white"
                    width={"full"}
                    _hover={{
                      bg: "none",
                    }}
                    onClick={onOpen}
                  >
                    Connect Wallet
                  </Button>
                  <AddWalletModal {...rest} />
                </>
              )}

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

export const addWalletSchema = z.object({
  walletAddress: z.string().refine((value) => ethers.isAddress(value), {
    message:
      "Provided address is invalid. Please insure you have typed correctly.",
  }),
});

const AddWalletModal: FC<Omit<UseDisclosureReturn, "onOpen">> = ({
  isOpen,
  onClose,
}) => {
  const toast = useToast();
  const userUtils = api.useContext().user;
  const mutation = api.user.addWalletAddress.useMutation({
    onSuccess: async () => {
      toast({
        title: "Wallet address added",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      await userUtils.getUser.invalidate();
      onClose();
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useZodForm({
    schema: addWalletSchema,
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} size="xl">
        <ModalOverlay />
        <ModalContent bg="#1C202D" color="white">
          <ModalHeader mx={"auto"} mt={4}>
            <Heading size="lg" fontWeight="regular">
              Add your wallet address
            </Heading>
          </ModalHeader>
          <ModalBody>
            <form
              className="mt-4"
              onSubmit={(e) => {
                handleSubmit(async (values) => {
                  await mutation.mutateAsync(values);
                })(e).catch(() => {
                  console.log(e);
                });
              }}
            >
              <FormControl isInvalid={!!errors.walletAddress}>
                <CustomInput
                  id="walletAddress"
                  placeholder="Enter the walletAddress"
                  {...register("walletAddress", {
                    required: "Wallet Address is required",
                  })}
                />
                <FormErrorMessage>
                  {errors.walletAddress && errors.walletAddress.message}
                </FormErrorMessage>
              </FormControl>

              <div className="my-6 flex justify-between">
                <Button
                  width="full"
                  mr={2}
                  type="submit"
                  isLoading={isSubmitting}
                  loadingText="Creating"
                  isDisabled={!isValid}
                  _disabled={{ bg: "gray.600" }}
                >
                  Submit
                </Button>
                <Button
                  variant="ghost"
                  width="full"
                  onClick={handleClose}
                  ml={2}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Sidebar;
