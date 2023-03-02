// components/Room/Controls.jsx

import {
  useHMSStore,
  useHMSActions,
  selectIsLocalAudioEnabled,
  selectLocalPeer,
} from "@100mslive/hms-video-react";

import MicButton from "./MicButton";
import ExitButton from "./ExitButton";
import HandRaiseButton from "./HandRaiseButton";
import { Button } from "@chakra-ui/react";
import { BiExit } from "react-icons/bi";

const Controls = () => {
  const hmsActions = useHMSActions();
  const isMicOn = useHMSStore(selectIsLocalAudioEnabled);
  const peer = useHMSStore(selectLocalPeer);

  const isListenerOrHandraised =
    peer?.roleName === "listener" || peer?.roleName === "handraise";

  return (
    <div className="flex justify-center space-x-4">
      {!isListenerOrHandraised && (
        <MicButton
          isMicOn={isMicOn}
          toggleMic={() => hmsActions.setLocalAudioEnabled(!isMicOn)}
        />
      )}
      {isListenerOrHandraised && (
        <HandRaiseButton
          isHandRaised={peer.roleName === "handraise"}
          toggleHandRaise={() => void 0}
        />
      )}
      <Button
        onClick={() => {
          hmsActions.leave().catch((e) => console.log(e));
        }}
        className=""
        rightIcon={<BiExit className="h-5 w-5" />}
      >
        Exit Quietly
      </Button>
    </div>
  );
};

export default Controls;
