"use client";

import React from "react";
import Image from "next/image";

import modelPro from "../../assets/Main/pro.png";
import modelTitan from "../../assets/Main/titan.png";
import logo from "../../assets/Main/airam-e-series-black.png";
import quoteLeft from "../../assets/Main/double-quote-left.png";
import quoteRight from "../../assets/Main/double-quote-right.png";

const ModelLine = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 px-4 py-16 lg:gap-12 lg:py-24">
      <div className="text-xl font-semibold lg:text-3xl">MODEL LINE</div>
      <span className="h-[2px] w-12 bg-blue-400 lg:w-32" />
      <div className="my-8 hidden flex-col items-center gap-8 lg:flex">
        <Image src={quoteLeft} alt="quoteLeft" className="w-8" />
        <span className="text-2xl">
          AIRAM cares about the environment where our family stays.
        </span>
        <Image src={quoteRight} alt="quoteRight" className="w-8" />
      </div>
      <div className="grid w-full grid-cols-2 gap-4 lg:max-w-[1320px]">
        <div className="flex flex-col items-center gap-2 lg:gap-6">
          <div className="h-48 w-full overflow-hidden lg:h-80">
            <Image
              src={modelPro}
              alt="SAP-500E"
              className="h-full w-full object-contain"
            />
          </div>
          <Image
            src={logo}
            alt="AIRAM"
            className="h-6 object-contain lg:h-13"
            style={{ maxWidth: "100%" }}
          />
          <span className="h-[1px] w-full bg-gray-100" />
          <p
            className="text-sm font-semibold lg:text-xl"
            style={{ letterSpacing: "5px" }}
          >
            SAP-500E
          </p>
        </div>
        <div className="flex flex-col items-center gap-2 lg:gap-6">
          <div className="h-48 w-full overflow-hidden lg:h-80">
            <Image
              src={modelTitan}
              alt="SAP-700E"
              className="h-full w-full object-contain"
            />
          </div>
          <Image
            src={logo}
            alt="AIRAM"
            className="h-6 object-contain lg:h-13"
            style={{ maxWidth: "100%" }}
          />
          <span className="h-[1px] w-full bg-gray-100" />
          <p
            className="text-sm font-semibold lg:text-xl"
            style={{ letterSpacing: "5px" }}
          >
            SAP-700E
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModelLine;
