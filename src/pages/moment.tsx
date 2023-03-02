import {
  Button,
  Card,
  CardBody,
  FormControl,
  FormErrorMessage,
  Heading,
  Image as ChakraImage,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Stack,
  Text,
  useDisclosure,
  type InputProps,
  type UseDisclosureReturn,
} from "@chakra-ui/react";
import Layout from "~/components/Layout";

const MomentNFT = () => {
  return (
    <Layout>
      <div className="mx-10 mt-10">
        <div className="flex justify-between">
          <h1 className="text-4xl font-semibold">Moments as NFTs</h1>
          {/* <Button onClick={onOpen}>Host a watch party</Button> */}
        </div>
        <p className="mt-4 text-[20px]">
          Experience the thrill of the game with like-minded fans at a local
          café or join a friendly host at their home and cheer on your favorite
          team together!
        </p>
        <div className="mt-14">
          <h2 className="text-[32px] font-medium">Watch Parties Near You</h2>
          {/* {isLoading || !watchParties ? (
          <Stack mt={4}>
            <Skeleton height="50px" />
            <Skeleton height="50px" />
            <Skeleton height="50px" />
          </Stack>
        ) : (
          <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {watchParties.map((party) => (
              <Party key={party.id} watchParty={party} />
            ))}
          </div>
        )} */}
        </div>
      </div>
    </Layout>
  );
};

export default MomentNFT;
