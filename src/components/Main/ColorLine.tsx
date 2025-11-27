"use client";

import React from "react";
import Image from "next/image";

import colorGray from "../../assets/Main/gray.png";
import colorRose from "../../assets/Main/rosegold.png";

const ColorLine = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 bg-[#3636360d] px-4 py-16 md:gap-12 md:py-24">
      <div className="text-xl font-semibold md:text-3xl">COLOR LINE</div>
      <span className="h-[2px] w-12 bg-blue-400 md:w-32" />
      <div className="my-8 hidden md:flex"></div>
      <div className="grid w-full grid-cols-2 gap-4 md:max-w-[1320px]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-48 w-full overflow-hidden md:h-80">
            <Image
              src={colorGray}
              alt="colorGray"
              className="h-full w-full object-contain"
            />
          </div>
          <span className="h-[1px] w-full bg-gray-100" />
          <p
            className="text-sm font-semibold md:text-xl"
            style={{ letterSpacing: "3px" }}
          >
            Black+Gray
          </p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="h-48 w-full overflow-hidden md:h-80">
            <Image
              src={colorRose}
              alt="colorRose"
              className="h-full w-full object-contain"
            />
          </div>
          <span className="h-[1px] w-full bg-gray-100" />
          <p
            className="text-sm font-semibold md:text-xl"
            style={{ letterSpacing: "3px" }}
          >
            White+Rosegold
          </p>
        </div>
      </div>
    </div>
  );
};

export default ColorLine;
