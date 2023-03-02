import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image as ChakraImage,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";
import Layout from "~/components/Layout";
import Image from "next/image";

const Watch = () => {
  return (
    <Layout>
      <div className="mx-10 mt-10">
        <div className="flex justify-between">
          <h1 className="text-4xl font-semibold">Watch Party</h1>
          <Button>Host a watch party</Button>
        </div>
        <p className="mt-4 text-[20px]">
          Experience the thrill of the game with like-minded fans at a local
          café or join a friendly host at their home and cheer on your favorite
          team together!
        </p>
        <div className="mt-14">
          <h2 className="text-[32px] font-medium">Watch Parties Near You</h2>
          <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Party />
            <Party />
            <Party />
            <Party />
            <Party />
            <Party />
            <Party />
          </div>
        </div>
      </div>
    </Layout>
  );
};

const Party: FC = () => {
  return (
    <Card maxW="sm" bg="#F1F1F1" className="col-span-1 mx-auto">
      <ChakraImage
        src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
        alt="Green double couch with wooden legs"
        borderTopRadius={"lg"}
      />
      <CardBody>
        <Stack spacing="3">
          <Heading size="md">The Bliss Cafe</Heading>
          <div className="flex items-center">
            <Image
              src="/icons/cricket.png"
              height={29}
              width={29}
              alt="Cricket Icon"
              className="mr-2"
            />
            <Text color="#595959">Ind vs Aus . 6:30 PM</Text>
          </div>
          <div className="flex items-center">
            <Image
              src="/icons/location.png"
              height={29}
              width={29}
              alt="Location Icon"
              className="mr-2"
            />
            <Text color="#595959">Estancia 2131</Text>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Image
                src="/icons/ticket.png"
                height={29}
                width={29}
                alt="Ticket Icon"
                className="mr-2"
              />
              <Text color="#595959">$10</Text>
            </div>
            <div className="flex items-center">
              <Image
                src="/icons/multi-people.png"
                height={28}
                width={28}
                alt="People Icon"
                className="mr-2"
              />
              <Text color="#595959">20/90</Text>
            </div>
          </div>
        </Stack>
        <Button mt="4" width={"full"}>
          Join
        </Button>
      </CardBody>
    </Card>
  );
};

export default Watch;
