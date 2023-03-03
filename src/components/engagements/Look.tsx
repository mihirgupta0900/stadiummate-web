import Image from "next/image";
import React from "react";

const Look = () => {
  return (
    <div>
      {" "}
      <h1 className="px-[5%] pt-[5%] text-2xl font-medium ">Look A like Cam</h1>
      <p className="px-[5%] pb-[5%] ">
        Lets find the magical characters between our fans
      </p>
      <div className="flex flex-row items-center justify-center gap-10">
        {" "}
        <div className="flex flex-col items-center">
          <Image
            src="/icons/watcher.svg"
            alt="watcher"
            width={150}
            height={150}
          />
          <p>Mat Parker</p>
          <p> Pavillion End</p>
        </div>
        <div className="flex flex-col items-center">
          <Image
            src="/icons/shrek.svg"
            alt="watcher"
            width={150}
            height={150}
          />
          <p>Shrek</p>
          <p>Movie - Shrek</p>
        </div>
      </div>
    </div>
  );
};

export default Look;
