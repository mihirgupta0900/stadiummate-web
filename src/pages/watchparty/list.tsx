import React from "react";
import { api } from "~/utils/api";

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
              <div className="my-4 w-full border border-black" key={party.id}>
                <h1>Title: {party.title}</h1>
                <h2>Location: {party.location}</h2>
                <h3>Date and Time: {party.time.toLocaleString()}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchPartyList;
