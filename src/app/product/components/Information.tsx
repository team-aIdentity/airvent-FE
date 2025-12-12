"use client";

import React, { useEffect, useState } from "react";
import Container from "@/components/Layout/Container";
import { Book, Plug, Smartphone } from "lucide-react";

interface InformationProps {
  productType: string;
}

const Information: React.FC<InformationProps> = ({ productType }) => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 1024);
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const partsList = [
    {
      icon: (
        <div className="flex h-7 w-11 items-center justify-center rounded-md bg-[#374151] lg:h-10 lg:w-15">
          <div className="h-4 w-4 rounded-full bg-[#10B981] lg:h-6 lg:w-6" />
        </div>
      ),
      title:
        productType === "pro" ? "Airvent Pro Device" : "Airvent TITAN Device",
      description: "Main monitoring unit with sensors",
    },
    {
      icon: <Plug size={30} className="lg:!size-10" />,
      title: "Power Adapter",
      description: "USB-C adapter with plugs",
    },
    {
      icon: <Smartphone size={30} className="lg:!size-10" />,
      title: "Mobile App Access",
      description: "iOS and Android app",
    },
    {
      icon: <Book size={30} className="lg:!size-10" />,
      title: "Setup Guide",
      description: "Quick start guide and documentation",
    },
  ];

  return (
    <Container className="py-8 lg:bg-white lg:px-20 lg:py-20">
      <div className="mx-auto flex w-full max-w-xl flex-col gap-8 lg:max-w-7xl lg:gap-12">
        {/* title */}
        <div className="text-center text-2xl font-bold lg:text-4xl">
          What's in the Box?
        </div>
        {/* parts */}
        <div className="grid gap-5 lg:grid-cols-4">
          {partsList.map((part, index) => (
            <div
              key={index}
              className="grid place-items-center gap-4 rounded-lg bg-[#FFFFFF] p-5 shadow-sm lg:gap-5 lg:p-8 lg:shadow-md"
              style={{
                boxShadow: isDesktop
                  ? "0 4px 24px 0 rgba(0, 0, 0, 0.04)"
                  : "0 2px 12px 0 rgba(0, 0, 0, 0.04)",
              }}
            >
              <div className="flex h-20 w-30 items-center justify-center rounded-lg bg-[#F9FAFB] lg:h-30 lg:w-40">
                {part.icon}
              </div>
              <div className="space-y-1.5 text-center">
                <div className="font-bold lg:text-lg">{part.title}</div>
                <div className="text-xs text-[#6B7280] lg:text-sm">
                  {part.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Information;
