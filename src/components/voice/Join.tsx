// components/Join.jsx

import Image from "next/image";
import { useState } from "react";
import Avatar from "boring-avatars";
import { useHMSActions } from "@100mslive/hms-video-react";

import NameInput from "./Join/NameInput";
import RoleSelect from "./Join/RoleSelect";
import JoinButton from "./Join/JoinButton";

const Join = () => {
  const hmsActions = useHMSActions();

  const [name, setName] = useState("");
  const [role, setRole] = useState("listener");

  const joinRoom = async () => {
    try {
      const response = await fetch("/api/token", {
        method: "POST",
        body: JSON.stringify({ role }),
      });
      const { token } = await response.json();
      hmsActions.join({
        userName: name || "Anonymous",
        authToken: token,
        settings: {
          isAudioMuted: true,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center gap-20">
      <h1>Join Room</h1>
      <div className=" flex w-[30%] flex-col items-center ">
        <Avatar name={name} variant="marble" size="72" />
        <NameInput name={name} setName={setName} />
        <RoleSelect role={role} setRole={setRole} />
        <div className="">
          {" "}
          <JoinButton joinRoom={joinRoom} />
        </div>
      </div>
    </main>
  );
};

export default Join;
