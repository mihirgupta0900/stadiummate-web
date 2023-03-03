import React from "react";
import Image from "next/image";
const Video = () => {
  const videoData = [
    {
      id: 1,
      video: "/icons/video1.svg",
    },
    {
      id: 2,
      video: "/icons/video2.svg",
    },
    {
      id: 3,
      video: "/icons/video3.svg",
    },
  ];
  return (
    <div className="py-[2%]">
      <h1 className="text-xl font-semibold text-gray-700 ">Videos</h1>
      <div className="mx-4 flex flex-col flex-wrap gap-[2%]  md:flex-row lg:flex-row">
        {videoData.map((match) => (
          <div
            className="my-2 flex flex-col rounded-md bg-slate-100  shadow-md "
            key={match.id}
          >
            <img src={match.video} alt="video" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Video;
