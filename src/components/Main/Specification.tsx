"use client";

import React from "react";
import SpecTable500E from "../Table/SpecTable500E";
import SpecTable700E from "../Table/SpecTable700E";

const Specification = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 px-4 py-16">
      <div className="text-xl font-semibold lg:text-3xl">SPECIFICATION</div>
      <span className="h-[2px] w-12 bg-blue-400 lg:w-32" />
      <SpecTable500E />
      <SpecTable700E />
    </div>
  );
};

export default Specification;
