// components/Room.jsx

import { selectPeers, useHMSStore } from "@100mslive/hms-video-react";

import RoomInfo from "./Room/RoomInfo";
import Controls from "./Room/Controls";
import ListenerTile from "./User/ListenerTile";
import SpeakerTile from "./User/SpeakerTile";

const Room = () => {
  const peers = useHMSStore(selectPeers);

  const speakersAndModerators = peers.filter(
    (peer) => peer.roleName === "speaker" || peer.roleName === "moderator"
  );
  const listenersAndHandraised = peers.filter(
    (peer) => peer.roleName === "listener" || peer.roleName === "handraise"
  );

  return (
    <div className="bg-main mx-[20vw] flex min-h-screen flex-col p-6 text-white">
      <RoomInfo count={peers.length} />
      <div className="flex-1 py-8">
        <h5 className="mb-8 text-sm font-bold uppercase text-gray-300">
          Speakers - {speakersAndModerators.length}
        </h5>
        <div className="flex flex-wrap space-x-6">
          {speakersAndModerators.map((speaker) => (
            <SpeakerTile key={speaker.id} peer={speaker} />
          ))}
        </div>
        <h5 className="my-8 text-sm font-bold uppercase text-gray-300">
          Listeners - {listenersAndHandraised.length}
        </h5>
        <div className="flex flex-wrap space-x-8">
          {listenersAndHandraised.map((listener) => (
            <ListenerTile key={listener.id} peer={listener} />
          ))}
        </div>
      </div>
      <Controls />
    </div>
  );
};

export default Room;
