"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import Container from "@/components/Layout/Container";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { CheckCircle, Shield, Truck } from "lucide-react";

import pro from "@/assets/Product/pro.png";
import titan from "@/assets/Product/titan.png";

interface ProductDetailProps {
  productType: string;
  title: string;
  description: string;
  price: number;
  discount: number;
  keyFeatures: readonly string[];
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  productType,
  title,
  description,
  price,
  discount,
  keyFeatures,
}) => {
  const [selectedColor, setSelectedColor] = useState("gray");

  return (
    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-center lg:gap-20 lg:bg-[#F9FAFB] lg:px-20">
      <Container className="py-6 lg:px-0 lg:py-15">
        <div className="mx-auto flex w-full max-w-xl flex-col gap-6">
          {/* Image Container */}
          <div className="overflow-hidden rounded-xl border border-[1px] border-[#E5E7EB] bg-white p-8">
            <Image
              src={productType === "pro" ? pro : titan}
              alt="Air Quality Monitor"
              className="h-auto w-full scale-150"
            />
          </div>

          {/* Color Selector */}
          <div className="flex flex-col items-start">
            <h2 className="mb-4 ml-2 text-xl font-bold text-gray-800 lg:text-2xl">
              COLOR
            </h2>
            <div className="flex gap-4">
              {/* Gray Color Option */}
              <div
                className={`cursor-pointer rounded-lg border-2 ${
                  selectedColor === "gray"
                    ? "border-[#10B981]"
                    : "border-transparent"
                }`}
                onClick={() => setSelectedColor("gray")}
              >
                <div className="flex h-20 w-30 items-center justify-center rounded-lg bg-[#F3F4F6]">
                  <div className="h-8 w-8 rounded-full bg-[#676767]"></div>
                </div>
              </div>

              {/* Peach Color Option */}
              <div
                className={`cursor-pointer rounded-lg border-2 ${
                  selectedColor === "rose"
                    ? "border-[#10B981]"
                    : "border-transparent"
                }`}
                onClick={() => setSelectedColor("rose")}
              >
                <div className="flex h-20 w-30 items-center justify-center rounded-lg bg-[#F3F4F6]">
                  <div className="h-8 w-8 rounded-full bg-[#FFD1B9]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container className="bg-white py-6 lg:bg-[#F9FAFB] lg:py-15">
        <div className="mx-auto flex w-full max-w-xl flex-col gap-6 lg:gap-8">
          {/* Description */}
          <div className="flex flex-col gap-3 lg:gap-4">
            {/* badge */}
            <div
              className="flex h-6 w-fit items-center rounded-xl px-2 text-[10px] font-semibold text-white"
              style={{
                background:
                  "linear-gradient(225deg, #10B981 14.64%, #059669 85.36%)",
              }}
            >
              DEPIN Device
            </div>
            {/* title */}
            <div className="text-center text-[28px] font-bold lg:text-start lg:text-5xl">
              {title}
            </div>
            <div className="text-center text-[#6B7280] lg:text-start lg:text-lg">
              {description}
            </div>
          </div>

          {/* Price */}
          <div className="flex flex-col gap-3 lg:flex-row lg:gap-4">
            {/* discounted price */}
            <div className="flex items-center justify-center gap-3 lg:justify-start lg:gap-4">
              <div className="text-xs text-[#9CA3AF] lg:text-sm">
                Starting from
              </div>
              <div className="text-[32px] font-bold lg:text-4xl">
                $
                {Math.round(
                  price *
                    (1 - (typeof discount === "number" ? discount : 0) / 100),
                ).toLocaleString()}
              </div>
            </div>
            {/* original price */}
            <div className="flex items-center gap-2">
              <div className="text-[#9CA3AF] line-through lg:text-lg">
                ${price}
              </div>
              <div className="flex h-6 w-fit items-center rounded-xl bg-[#EF4444] px-[6px] text-[9px] font-semibold text-white lg:text-[10px]">
                30% OFF
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="flex flex-col gap-3">
            <div className="font-semibold text-[#374151] lg:text-lg">
              Key Features
            </div>
            <div className="flex flex-col gap-2">
              {keyFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-xs text-[#6B7280] lg:text-sm"
                >
                  <CheckCircle size={16} color="#10B981" />
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3 lg:gap-4">
            <HoverCard>
              {/* <HoverCardTrigger> */}
              <Link href={`/checkout/${productType}/${selectedColor}`}>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full lg:h-14"
                  // disabled
                >
                  Buy Now
                </Button>
              </Link>
              {/* </HoverCardTrigger> */}
              {/* <HoverCardContent align="end">Coming Soon</HoverCardContent> */}
            </HoverCard>
            <div className="flex flex-col gap-1 text-xs text-[#6B7280] lg:flex-row lg:justify-between lg:text-sm">
              <div className="flex items-center justify-center gap-[6px]">
                <Truck size={14} color="#6B7280" />
                Free shipping worldwide
              </div>
              <div className="flex items-center justify-center gap-[6px]">
                <Shield size={14} color="#6B7280" />
                2-year warranty included
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductDetail;
