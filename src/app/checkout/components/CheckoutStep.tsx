import { Check } from "lucide-react";
import React from "react";

const CheckoutStep = ({ step }: { step: number }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 border-b border-gray-300 bg-white p-5">
      <div className="text-lg font-semibold lg:text-2xl">Checkout</div>
      <div className="flex items-center gap-6">
        <div
          className={`${step === 1 ? "" : "text-[#10B981]"} flex items-center gap-2 font-semibold lg:gap-3`}
        >
          <span
            className={`${step === 1 ? "bg-[#111827] text-white" : "bg-[#10B981] text-white"} flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold lg:h-8 lg:w-8 lg:text-base`}
          >
            {step === 1 ? 1 : <Check size={12} />}
          </span>
          Payment
        </div>
        <span
          className={`h-[2px] w-10 ${step === 1 ? "bg-[#E5E7EB]" : "bg-[#10B981]"}`}
        ></span>
        <div
          className={`${step === 2 ? "" : "text-[#6B7280]"} flex items-center gap-2 font-semibold lg:gap-3`}
        >
          <span
            className={`${step === 2 ? "bg-[#111827] text-white" : "bg-[#E5E7EB] text-[#6B7280]"} flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold lg:h-8 lg:w-8 lg:text-base`}
          >
            2
          </span>
          Shipping
        </div>
      </div>
    </div>
  );
};

export default CheckoutStep;
