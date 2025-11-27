"use client";

import React from "react";
import { Brain, Coins, Network } from "lucide-react";

const benefitList = [
  {
    icon: <Coins size={20} color="white" className="lg:!size-6" />,
    title: "Earn Crypto Rewards",
    subTitle: "Daily token rewards",
    description:
      "Generate passive income by contributing environmental data to the decentralized network.",
    background: "linear-gradient(225deg, #10B981 14.64%, #059669 85.36%)",
  },
  {
    icon: <Network size={20} color="white" className="lg:!size-6" />,
    title: "Global Network",
    subTitle: "Decentralized monitoring",
    description:
      "Join thousands of devices worldwide creating the largest environmental database.",
    background: "linear-gradient(225deg, #3B82F6 14.64%, #1D4ED8 85.36%)",
  },
  {
    icon: <Brain size={20} color="white" className="lg:!size-6" />,
    title: "AI Insights",
    subTitle: "Smart recommendations",
    description:
      "Get personalized air quality insights powered by machine learning algorithms.",
    background: "linear-gradient(225deg, #8B5CF6 14.64%, #7C3AED 85.36%)",
  },
];

const Benefits = () => {
  return (
    <div
      className="px-5 py-8 lg:px-15 lg:py-15"
      style={{
        background: "linear-gradient(225deg, #F0FDF4 14.64%, #ECFDF5 85.36%)",
      }}
    >
      <div className="mx-auto flex w-full max-w-xl flex-col gap-8 lg:max-w-7xl lg:gap-12">
        {/* title */}
        <div className="grid gap-3 text-center lg:gap-4">
          <div className="text-center text-2xl font-bold lg:text-4xl">
            Why Choose Airvent?
          </div>
          <div className="text-sm text-[#6B7280] lg:text-lg">
            Join the DePIN network and earn while monitoring
          </div>
        </div>
        {/* parts */}
        <div className="grid gap-5 lg:grid-cols-3 lg:gap-10">
          {benefitList.map((benefit, index) => (
            <div
              key={index}
              className="grid gap-4 rounded-lg bg-[#FFFFFF] p-5 lg:gap-5 lg:p-6"
              style={{ boxShadow: "0 2px 12px 0 rgba(0, 0, 0, 0.04)" }}
            >
              <div className="flex gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg lg:h-14 lg:w-14"
                  style={{
                    background: benefit.background,
                  }}
                >
                  {benefit.icon}
                </div>
                <div className="flex flex-col">
                  <div className="font-bold lg:text-xl">{benefit.title}</div>
                  <div className="text-xs text-[#4B5563] lg:text-sm">
                    {benefit.subTitle}
                  </div>
                </div>
              </div>
              <div className="text-sm text-[#4B5563] lg:text-base">
                {benefit.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Benefits;
