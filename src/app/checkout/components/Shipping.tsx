import React from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useProduct } from "@/hooks/useProduct";
import { getData } from "country-list";
import "react-phone-input-2/lib/style.css";

import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

import pro from "@/assets/Product/pro.png";
import titan from "@/assets/Product/pro.png";
import { CheckCircle, Coins, Info, Mail, Truck } from "lucide-react";
import PhoneInput from "react-phone-input-2";

const Shipping = () => {
  const params = useParams();
  const color = params?.color as string;
  const { product, productType, isLoading } = useProduct();
  const countries = getData();
  const [phone, setPhone] = React.useState("");

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col lg:max-w-7xl lg:flex-row lg:items-start lg:gap-12 lg:p-10">
      <div className="flex flex-col gap-5 lg:w-1/2">
        {/* Payment Confirmation Card */}
        <div className="mt-5 flex flex-col gap-3 bg-[#DCFCE7] px-5 py-4 text-[#065F46]">
          <div className="flex items-center gap-2 font-semibold">
            <CheckCircle />
            Payment Confirmed
          </div>
          <div className="text-sm">
            Your crypto payment has been confirmed on the blockchain
          </div>
        </div>

        {/* Information */}
        <div className="flex flex-col">
          <Accordion type="single" collapsible defaultValue="item-1">
            <AccordionItem value="item-1">
              <AccordionTrigger className="lg:text-2xl">
                Account Information
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-4 text-sm lg:gap-8">
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Email *</label>
                    <Input placeholder="example@gmail.com" />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible defaultValue="item-1">
            <AccordionItem value="item-1">
              <AccordionTrigger className="lg:text-2xl">
                Wallet Configuration{" "}
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-4 text-sm lg:gap-8">
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">
                      EVM Wallet (Rewards)
                    </label>
                    <Input placeholder="0x0333...edefa" />
                    <span className="text-xs text-[#6B7280]">
                      For claiming additional rewards
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">
                      Solana Wallet (Mining)
                    </label>
                    <Input placeholder="Fp84u...VvB8HC" />
                    <span className="text-xs text-[#6B7280]">
                      Your device will be pre-configured{" "}
                    </span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible defaultValue="item-1">
            <AccordionItem value="item-1">
              <AccordionTrigger className="lg:text-2xl">
                Shipping Address{" "}
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-4 text-sm lg:gap-8">
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Country/Region *</label>
                    <select className="focus-visible:border-ring focus-visible:ring-ring/50 w-full rounded-md border border-[#E5E7EB] bg-transparent px-2 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[1px]">
                      <option value="">Select a country</option>
                      {countries.map((country: any) => (
                        <option key={country.code} value={country.code}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">
                      Resident Registration Number{" "}
                    </label>
                    <Input placeholder="." />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">
                      Personal Clearance Number *{" "}
                    </label>
                    <Input placeholder="." />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-2">
                      <label className="font-semibold">First Name * </label>
                      <Input placeholder="." />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-semibold">Last Name * </label>
                      <Input placeholder="." />
                    </div>
                  </div>{" "}
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Date of Birth * </label>
                    <Input placeholder="05.30.2000" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Street Address *</label>
                    <Input placeholder="." />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">
                      Apartment, suite, etc.
                    </label>
                    <Input placeholder="." />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-2">
                      <label className="font-semibold">City *</label>
                      <Input placeholder="." />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-semibold">State</label>
                      <Input placeholder="." />
                    </div>
                  </div>{" "}
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Postal Code * </label>
                    <Input placeholder="." />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Mobile Phone *</label>
                    <PhoneInput
                      country={"kr"}
                      value={phone}
                      onChange={(value) => setPhone(value)}
                      inputClass="!w-full !rounded-md !border !border-[#E5E7EB] !bg-transparent !pr-4 !pl-12 !py-5 !text-base focus-visible:border-ring focus-visible:ring-ring/50 shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[1px]"
                      buttonClass="!rounded-md !border !border-[#E5E7EB] !bg-transparent"
                      containerClass="!w-full"
                      placeholder="010-1234-5678"
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <div className="flex flex-col gap-5 lg:w-1/2 lg:rounded-lg lg:px-10">
        {/* Order Summary */}
        <div className="flex flex-col gap-5">
          <Accordion type="single" collapsible defaultValue="item-1">
            <AccordionItem value="item-1">
              <AccordionTrigger className="lg:text-2xl">
                Order Summary
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-4 lg:gap-8">
                  <div className="flex justify-between gap-3">
                    <div className="flex h-15 w-15 min-w-15 items-center justify-center overflow-hidden rounded-md border border-[#E5E7EB] bg-[#F9FAFB] p-2 lg:h-20 lg:w-20 lg:min-w-20">
                      <Image
                        src={productType === "pro" ? pro : titan}
                        alt="product"
                        className="!scale-150"
                      />
                    </div>
                    <div className="flex w-full flex-col items-start justify-center text-sm lg:text-lg">
                      <div className="font-semibold">
                        {productType === "pro"
                          ? "AIRVENT PRO"
                          : "AIRVENT TITAN"}
                      </div>
                      <div className="text-[#6B7280]">
                        {color === "gray" ? "Space Gray" : "Rose Gold"}
                      </div>
                      <div className="text-[#6B7280]">Qty: 1</div>
                    </div>
                    <div className="flex items-center text-sm font-semibold lg:text-lg">
                      $
                      {Math.round(
                        product.price -
                          product.price * (product.discount / 100),
                      )}
                    </div>
                  </div>

                  <span className="border-b border-[#E5E7EB]" />

                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between text-sm lg:text-base">
                      <div className="text-[#6B7280]">Payment Method</div>
                      <div className="flex items-center rounded-full border border-[#10B981] bg-[#F0FDF4] px-2 text-xs font-semibold text-[#059669]">
                        Crypto
                      </div>
                    </div>
                    <div className="flex justify-between text-sm lg:text-base">
                      <div className="text-[#6B7280]">Transaction ID</div>
                      <div className="font-semibold">
                        {/* TODO : tx hash */}0x7f2a...b8c3
                      </div>
                    </div>
                    <div className="flex justify-between text-sm lg:text-base">
                      <div className="text-[#6B7280]">Status</div>
                      <div className="flex items-center rounded-full bg-[#F0FDF4] px-2 text-xs font-semibold text-[#059669]">
                        Confirmed
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 rounded-lg bg-[#EFF6FF] p-5 text-[#1E40AF]">
                    <div className="flex items-center gap-3 font-semibold">
                      <Truck size={20} color="#3B82F6" /> Estimated Delivery
                    </div>
                    <div className="text-sm">
                      Based on your location, your Airvent Pro will arrive
                      within 7-14 business days via standard shipping.
                    </div>
                    <span className="flex items-center gap-2 text-xs">
                      <Mail size={16} color="#3B82F6" /> Tracking information
                      will be sent to your email
                    </span>
                  </div>
                  <div className="flex flex-col gap-3 rounded-lg bg-[#F0FDF4] p-5 text-[#065F46]">
                    <div className="flex items-center gap-3 font-semibold">
                      <Coins size={20} color="#10B981" /> Start Earning
                      Immediately
                    </div>
                    <div className="text-sm">
                      Your device will be pre-configured for your wallets.
                      Simply plug in and start earning DePIN rewards!
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="flex items-center gap-2 text-xs">
                        <CheckCircle size={16} color="#10B981" /> EVM wallet
                        configured
                      </span>
                      <span className="flex items-center gap-2 text-xs">
                        <CheckCircle size={16} color="#10B981" /> Solana wallet
                        configured
                      </span>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <Button
          size="lg"
          className="my-5 bg-black text-white hover:bg-black/70"
        >
          Confirm & Continue
        </Button>
      </div>
    </div>
  );
};

export default Shipping;
