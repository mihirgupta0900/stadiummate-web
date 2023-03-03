import React from "react";
import Image from "next/image";
const Matches = () => {
  const matchData = [
    {
      id: 1,
      name: "India vs AUstralia",
      date: "2021-10-10",
      time: "10:00",
      venue: "M Chinnaswamy Stadium, Bengaluru",
      status: "Upcoming",
      team1Name: "India",
      team2Name: "Australia",
      occation: "18th Match, Group B. ICC T20 World Cup",
      team1: "/icons/ind.svg",
      team2: "/icons/aus.svg",
    },
    {
      id: 2,
      name: "Zimbabwe vs South Africa",
      date: "2021-10-10",
      time: "15:00",
      venue: "M Chinnaswamy Stadium, Bengaluru",
      status: "Upcoming",
      team1Name: "Zimbabwe",
      team2Name: "South Africa",
      occation: "18th Match, Group B. ICC T20 World Cup",
      team1: "/icons/aim.svg",
      team2: "/icons/saf.svg",
    },
  ];
  return (
    <div>
      <h1 className="text-xl font-semibold text-gray-700 ">Matches</h1>
      <div className="mx-4 flex flex-col gap-[2%]  md:flex-row lg:flex-row">
        {matchData.map((match) => (
          <div
            className="my-2 flex flex-col rounded-md bg-slate-100  shadow-md "
            key={match.id}
          >
            <p className="my-2 mx-2 text-sm text-gray-600">{match.occation}</p>
            <span className="my-2 mx-2 flex items-center gap-2">
              <Image src={match.team1} alt="logo" width={30} height={30} />
              {match.team1Name}
            </span>
            <span className="mx-2 my-2 flex items-center gap-2">
              <Image src={match.team2} alt="logo" width={30} height={30} />
              {match.team2Name}
            </span>
            <div className=" flex flex-row items-center gap-4 rounded-b-md bg-[#7267CB] px-2 py-2 text-white">
              <button>Points Table</button>
              <button>Schedule</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Matches;
