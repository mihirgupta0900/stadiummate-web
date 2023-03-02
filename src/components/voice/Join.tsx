import { useHMSActions } from "@100mslive/hms-video-react";
import { Button } from "@chakra-ui/react";
import Avatar from "boring-avatars";
import { useState } from "react";

import { api } from "~/utils/api";
import NameInput from "./Join/NameInput";
import RoleSelect from "./Join/RoleSelect";

const Join = () => {
  const hmsActions = useHMSActions();

  const [name, setName] = useState("");
  const [role, setRole] = useState("listener");

  const joinMutation = api.voice.getToken.useMutation({
    onSuccess: async ({ token }) => {
      await hmsActions.join({
        userName: name || "Anonymous",
        authToken: token,
        settings: {
          isAudioMuted: true,
        },
      });
    },
  });

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center gap-20">
      <h1>Join Room</h1>
      <div className=" flex w-[30%] flex-col items-center ">
        <Avatar name={name} variant="marble" size="72" />
        <NameInput name={name} setName={setName} />
        <RoleSelect role={role} setRole={setRole} />
        <div className="">
          {" "}
          <Button
            onClick={() => joinMutation.mutate({ role })}
            width="full"
            isLoading={joinMutation.isLoading}
            // className=""
          >
            Join Room
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Join;
