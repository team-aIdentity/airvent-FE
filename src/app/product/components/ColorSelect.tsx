import React, { useState } from "react";
import pro from "@/assets/Product/pro.png";
import titan from "@/assets/Product/pro.png"; // TODO : 실제 사진으로 변경
import Container from "../Layout/Container";

interface ColorSelectProps {
  productType: string;
}

const ColorSelect: React.FC<ColorSelectProps> = ({ productType }) => {
  const [selectedColor, setSelectedColor] = useState("gray");

  return (
    <Container className="py-6">
      <div className="mx-auto flex w-full max-w-sm flex-col gap-6">
        {/* Image Container */}
        <div className="rounded-xl border border-[1px] border-[#E5E7EB] bg-white p-8">
          <img
            src={productType === "pro" ? pro : titan}
            alt="Air Quality Monitor"
            className="h-auto w-full"
          />
        </div>

        {/* Color Selector */}
        <div className="flex flex-col items-start">
          <h2 className="mb-4 ml-2 text-xl font-bold text-gray-800">COLOR</h2>
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
                selectedColor === "peach"
                  ? "border-[#10B981]"
                  : "border-transparent"
              }`}
              onClick={() => setSelectedColor("peach")}
            >
              <div className="flex h-20 w-30 items-center justify-center rounded-lg bg-[#F3F4F6]">
                <div className="h-8 w-8 rounded-full bg-[#FFD1B9]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ColorSelect;
