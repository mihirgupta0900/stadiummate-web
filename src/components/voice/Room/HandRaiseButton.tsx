import { type FC } from "react";
import { MdOutlineFrontHand } from "react-icons/md";
import { clsx } from "clsx";

const HandRaiseButton: FC<{
  toggleHandRaise: () => void;
  isHandRaised: boolean;
}> = ({ toggleHandRaise, isHandRaised }) => {
  return (
    <button
      onClick={toggleHandRaise}
      className={clsx(
        isHandRaised && "bg-purple-500",
        "rounded-full border-2 border-purple-500 p-3"
      )}
    >
      <MdOutlineFrontHand className="h-5 w-5" />
    </button>
  );
};

export default HandRaiseButton;
