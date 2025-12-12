"use client";

import React from "react";
import Image from "next/image";

import Container from "@/components/Layout/Container";

import pro from "@/assets/Product/specs_pro.png";
import titan from "@/assets/Product/specs_titan.png";
import SpecTable500E from "@/components/Table/SpecTable500E";
import SpecTable700E from "@/components/Table/SpecTable700E";

interface SpecsProps {
  productType: string;
}

const Specs: React.FC<SpecsProps> = ({ productType }) => {
  return (
    <Container className="py-8 lg:py-20">
      <div className="mx-auto flex w-full max-w-xl flex-col gap-8 lg:max-w-7xl lg:gap-12">
        {/* title */}
        <div className="grid gap-3 text-center lg:gap-4">
          <div className="text-center text-2xl font-bold lg:text-4xl">
            Technical Specs
          </div>
          <div className="text-sm text-[#6B7280] lg:text-lg">
            Professional-grade sensors and connectivity
          </div>
        </div>
        {productType === "pro" ? <SpecTable500E /> : <SpecTable700E />}
        {/* image */}
        {/* <Image src={productType === "pro" ? pro : titan} alt="specs" /> */}
      </div>
    </Container>
  );
};

export default Specs;
