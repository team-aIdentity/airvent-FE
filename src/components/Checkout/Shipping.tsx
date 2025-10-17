import React from "react";
import { Input } from "../ui/input";

const Shipping = () => {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col">
      <div className="flex flex-col gap-6 py-5">
        <div className="flex flex-col gap-4">
          <div className="text-lg font-semibold">Account Information</div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-[#374151]">
              Email Address *
            </label>
            <Input type="email" placeholder="example@gmail.com" />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-lg font-semibold">Wallet Configuration</div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-[#374151]">
              EVM Wallet (Rewards)
            </label>
            <Input type="string" placeholder="0x0145...edefa" />
            <p className="text-xs text-[#6B7280]">
              For claiming additional rewards
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-[#374151]">
              Solana Wallet (Mining)
            </label>
            <Input type="string" placeholder="Fp84u...VvB8HC" />
            <p className="text-xs text-[#6B7280]">
              Your device will be pre-configured
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
