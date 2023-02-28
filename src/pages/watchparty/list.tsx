import { useSession } from "next-auth/react";
import React, { type FC } from "react";
import { api, type RouterOutputs } from "~/utils/api";

const WatchPartyList = () => {
  const { data: watchParties, isLoading } = api.watchParty.getAll.useQuery();

  return (
    <div className="my-10 flex flex-col items-center justify-center">
      <h1 className="text-6xl">Watch Parties</h1>
      <div className="mx-auto flex w-[80%] flex-col">
        {isLoading || !watchParties ? (
          <div>Loading...</div>
        ) : (
          <div className="">
            {watchParties.map((party) => (
              <WatchPartyItem party={party} key={party.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const WatchPartyItem: FC<{
  party: RouterOutputs["watchParty"]["getAll"][number];
}> = ({ party }) => {
  const watchPartyUtils = api.useContext().watchParty;
  const { data: session } = useSession();
  const joinMutation = api.watchParty.join.useMutation({
    onSuccess: async () => {
      await watchPartyUtils.getAll.invalidate();
    },
  });

  const isHost = party.hostId === session?.user?.id;
  const isAttendee = party.attendees.some(
    (attendee) => attendee.id === session?.user?.id
  );

  return (
    <div className="my-4 w-full border border-black" key={party.id}>
      <h1>Title: {party.title}</h1>
      <h2>Location: {party.location}</h2>
      <h3>Date and Time: {party.time.toLocaleString()}</h3>
      <div>Attendees: {party.attendees.length}</div>
      <div>Cost: ${party.cost}</div>
      {isHost ? (
        <span>You are the host!</span>
      ) : isAttendee ? (
        <span>You are attending!</span>
      ) : (
        <button onClick={() => joinMutation.mutate({ id: party.id })}>
          Join Now
        </button>
      )}
    </div>
  );
};

export default WatchPartyList;
