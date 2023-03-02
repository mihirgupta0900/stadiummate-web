import { CheckIcon } from "@chakra-ui/icons";
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

import Image from "next/image";
import { forwardRef, useEffect, useState, type FC } from "react";
import { Controller } from "react-hook-form";
import { z } from "zod";
import Layout from "~/components/Layout";
import { api, type RouterOutputs } from "~/utils/api";
import { useZodForm } from "~/utils/form";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDropzone } from "react-dropzone";
import { env } from "~/env.mjs";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";

const Watch = () => {
  const { onOpen, ...rest } = useDisclosure({ defaultIsOpen: false });
  const { data: watchParties, isLoading } = api.watchParty.getAll.useQuery();

  return (
    <Layout>
      <HostPartyModel {...rest} />
      <div className="mx-10 mt-10">
        <div className="flex justify-between">
          <h1 className="text-4xl font-semibold">Watch Party</h1>
          <Button onClick={onOpen}>Host a watch party</Button>
        </div>
        <p className="mt-4 text-[20px]">
          Experience the thrill of the game with like-minded fans at a local
          café or join a friendly host at their home and cheer on your favorite
          team together!
        </p>
        <div className="mt-14">
          <h2 className="text-[32px] font-medium">Watch Parties Near You</h2>
          {isLoading || !watchParties ? (
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
          )}
        </div>
      </div>
    </Layout>
  );
};
+
const Party: FC<{
  watchParty: RouterOutputs["watchParty"]["getAll"][number];
}> = ({ watchParty: party }) => {
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const isHost = party.hostId === user?.uid;
  const isAttendee = party.attendees.some(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    (attendee) => attendee.id === user?.uid
  );
  const isFull = party.attendees.length === party.capacity;
  const watchPartyUtils = api.useContext().watchParty;

  const joinMutation = api.watchParty.join.useMutation({
    onSuccess: async () => {
      await watchPartyUtils.getAll.invalidate();
    },
  });

  return (
    <Card maxW="sm" bg="#F1F1F1" className="col-span-1 mx-auto">
      <ChakraImage
        src={party.coverImage}
        alt="Green double couch with wooden legs"
        borderTopRadius={"lg"}
      />
      <CardBody>
        <Stack spacing="3">
          <Heading size="md">{party.title}</Heading>
          <div className="flex items-center">
            <Image
              src="/icons/cricket.png"
              height={29}
              width={29}
              alt="Cricket Icon"
              className="mr-2"
            />
            <Text color="#595959">
              Ind vs Aus . {party.time.toLocaleString()}
            </Text>
          </div>
          <div className="flex items-center">
            <Image
              src="/icons/location.png"
              height={29}
              width={29}
              alt="Location Icon"
              className="mr-2"
            />
            <Text color="#595959">{party.location}</Text>
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
              <Text color="#595959">${party.cost}</Text>
            </div>
            <div className="flex items-center">
              <Image
                src="/icons/multi-people.png"
                height={28}
                width={28}
                alt="People Icon"
                className="mr-2"
              />
              <Text color="#595959">
                {party.attendees.length}/{party.capacity}
              </Text>
            </div>
          </div>
        </Stack>
        <Button
          mt="4"
          width={"full"}
          isDisabled={isHost || isAttendee || isFull}
          onClick={() => joinMutation.mutate({ id: party.id })}
          isLoading={joinMutation.isLoading}
          loadingText="Joining"
          {...(isAttendee && { rightIcon: <CheckIcon /> })}
        >
          {isHost
            ? "You are host"
            : isAttendee
            ? "Joined"
            : isFull
            ? "Party at capacity"
            : "Join"}
        </Button>
      </CardBody>
    </Card>
  );
};

export const createWatchPartySchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  time: z.date({
    required_error: "Time is required",
  }),
  cost: z.number({
    required_error: "Cost is required",
    invalid_type_error: "Cost must be a number",
  }),
  coverImage: z.string().min(1, {
    message: "Cover image is required",
  }),
});

const CustomInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => (
  <Input
    bg="rgba(201,201,201,22%)"
    border="none"
    _placeholder={{ color: "#989898" }}
    color="white"
    mt={6}
    ref={ref}
    size="lg"
    {...props}
  />
));
CustomInput.displayName = "CustomInput";

const handleUpload = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${env.NEXT_PUBLIC_CLOUDINARY_CLOUD_ID}/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return response.json().then((data) => data.secure_url as string);
};

const HostPartyModel: FC<Omit<UseDisclosureReturn, "onOpen">> = ({
  isOpen,
  onClose,
}) => {
  const watchPartyUtils = api.useContext().watchParty;
  const mutation = api.watchParty.create.useMutation({
    onSuccess: async () => {
      await watchPartyUtils.getAll.invalidate();
      onClose();
    },
  });
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useZodForm({
    schema: createWatchPartySchema,
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const [coverImage, setCoverImage] = useState<File | null>(null);

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose} size="xl">
        <ModalOverlay />
        <ModalContent bg="#1C202D" color="white">
          <ModalHeader mx={"auto"} mt={4}>
            <Heading size="lg" fontWeight="regular">
              Host a watch party
            </Heading>
          </ModalHeader>
          <ModalBody>
            <form
              className="mt-4"
              onSubmit={(e) => {
                handleSubmit(async (values) => {
                  if (!coverImage) return;

                  const coverImageURL = await handleUpload(coverImage);
                  values.coverImage = coverImageURL;
                  await mutation.mutateAsync(values);
                })(e).catch(() => {
                  console.log(e);
                });
              }}
            >
              <FormControl isInvalid={!!errors.title}>
                <CustomInput
                  id="title"
                  placeholder="Enter the title"
                  {...register("title", {
                    required: "Title is required",
                  })}
                />
                <FormErrorMessage>
                  {errors.title && errors.title.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.location}>
                <CustomInput
                  id="location"
                  placeholder="Enter the location"
                  {...register("location", {
                    required: "Location is required",
                  })}
                />
                <FormErrorMessage>
                  {errors.location && errors.location.message}
                </FormErrorMessage>
              </FormControl>{" "}
              <FormControl isInvalid={!!errors.cost}>
                <InputGroup mt={6} size="lg">
                  <InputLeftElement pointerEvents="none" fontSize="1.2em">
                    $
                  </InputLeftElement>
                  <Input
                    color="white"
                    border="none"
                    bg="rgba(201,201,201,22%)"
                    id="cost"
                    type="number"
                    size={"lg"}
                    placeholder="Enter the cost"
                    {...register("cost", {
                      required: "Cost is required",
                      valueAsNumber: true,
                    })}
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors.cost && errors.cost.message}
                </FormErrorMessage>
              </FormControl>{" "}
              <Controller
                control={control}
                name="time"
                render={({ field, fieldState: { error } }) => (
                  <>
                    <DatePicker
                      minDate={new Date()}
                      minTime={new Date()}
                      maxTime={new Date(new Date().setHours(23, 59, 59, 999))}
                      dateFormat="MMMM d, yyyy h:mm aa"
                      selected={field.value}
                      onChange={field.onChange}
                      placeholderText={"Enter Time"}
                      className="border border-black"
                      showTimeSelect
                      timeFormat="HH:mm"
                      customInput={<CustomDateInput />}
                    />
                    <FormErrorMessage>
                      {error && error.message}
                    </FormErrorMessage>
                  </>
                )}
              />
              <Controller
                control={control}
                name="coverImage"
                render={({ field }) => (
                  <Dropzone
                    onChange={field.onChange}
                    previewURL={field.value}
                    setFile={setCoverImage}
                  />
                )}
              />
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
                  Create
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

const CustomDateInput = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => <CustomInput ref={ref} {...props} />
);

CustomDateInput.displayName = "DateInput";

const Dropzone: FC<{
  onChange: (imageURL: string) => void;
  previewURL: string;
  setFile: (file: File) => void;
}> = ({ onChange, previewURL, setFile }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles);
      const file = acceptedFiles[0];
      if (!file) return;

      const _previewURL = URL.createObjectURL(file);
      setFile(file);
      onChange(_previewURL);
    },
    multiple: false,
    // accept: ["image/*"],
    // accept: "images/*",
  });

  useEffect(() => {
    return () => {
      if (previewURL) URL.revokeObjectURL(previewURL);
    };
  }, [previewURL]);

  return (
    <div
      {...getRootProps()}
      className="mt-6 flex cursor-pointer justify-center rounded-md bg-[rgba(201,201,201,22%)] py-10 px-4"
    >
      <input {...getInputProps()} />
      {previewURL ? (
        <img src={previewURL} alt="Cover Image Preview" />
      ) : isDragActive ? (
        <p>{`Drop the image here ...`}</p>
      ) : (
        <p>{`Drag 'n' drop your cover image, or click to select the image`}</p>
      )}
    </div>
  );
};

export default Watch;
