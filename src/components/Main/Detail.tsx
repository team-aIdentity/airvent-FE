"use client";

import React from "react";
import Image from "next/image";

import modelProDetail from "../../assets/Main/pro-detail.png";
import modelTitanDetail from "../../assets/Main/titan-detail.png";

const Detail = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 bg-[#ececec] px-4 py-16 md:gap-12 md:py-24">
      <div className="text-xl font-semibold md:text-3xl">COMPONENT NAMES</div>
      <span className="h-[2px] w-12 bg-blue-400 md:w-32" />
      <div className="flex w-full flex-col gap-4 md:max-w-[1320px]">
        <div className="flex w-full flex-col gap-2">
          <p className="text-xl font-semibold md:text-3xl">SAP-500E</p>
          <span className="h-[1px] w-full bg-black" />
          <div className="w-full overflow-hidden">
            <Image
              src={modelProDetail}
              alt="SAP-500E"
              className="h-full w-full object-contain"
            />
          </div>
        </div>
        <div className="flex w-full flex-col gap-2">
          <p className="text-xl font-semibold md:text-3xl">SAP-700E</p>
          <span className="h-[1px] w-full bg-black" />
          <div className="w-full overflow-hidden">
            <Image
              src={modelTitanDetail}
              alt="SAP-700E"
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
