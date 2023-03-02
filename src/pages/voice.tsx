import {
  HMSRoomProvider,
  useHMSStore,
  selectIsConnectedToRoom,
} from "@100mslive/hms-video-react";
import Head from "next/head";

import Join from "../components/voice/Join";
import Room from "../components/voice/Room";

const StagesApp = () => {
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  return isConnected ? <Room /> : <Join />;
};

const Voice = () => {
  return (
    <HMSRoomProvider>
      <Head>
        <title>Voice-party</title>
      </Head>
      <StagesApp />
    </HMSRoomProvider>
  );
};

export default Voice;
