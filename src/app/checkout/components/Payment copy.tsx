"use client";

import React from "react";
import Image from "next/image";

import { useParams } from "next/navigation";
import { useProduct } from "@/hooks/useProduct";
import { HelioCheckout, type HelioEmbedConfig } from "@heliofi/checkout-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

import pro from "@/assets/Product/pro.png";
import titan from "@/assets/Product/pro.png";
import { Headphones, ShieldCheck } from "lucide-react";

const paylinkIds: Record<string, string> = {
  pro: "68edd648092237f8976bc61b",
  titan: "68edd648092237f8976bc61b", // TODO : 실제 값으로 변경
};

const Payment = ({ onNext }: { onNext: () => void }) => {
  const params = useParams();
  const color = params?.color as string;
  const { product, productType, isLoading } = useProduct();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const helioConfig: HelioEmbedConfig = {
    paylinkId: paylinkIds[productType] || paylinkIds["pro"],
    customTexts: {
      mainButtonTitle: "Checkout",
      payButtonTitle: "Pay Now",
    },
    theme: {
      themeMode: "light",
    },
    primaryColor: "#10B981",
    neutralColor: "#10B981",
    backgroundColor: "#F0FDF4",
    amount: "499",
    onSuccess: async () => {
      try {
        // TODO : 결제 성공 후 처리 로직 추가 (예: 데이터베이스에 결제 이력 저장)
        onNext();
      } catch (error) {
        console.error("Error during onSuccess:", error);
      }
    },
    onError: () => {},
  };

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col">
      {/* Order Summary */}
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>Order Summary</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between gap-3">
                <div className="flex h-15 w-15 min-w-15 items-center justify-center overflow-hidden rounded-md border border-[#E5E7EB] bg-[#F9FAFB] p-2">
                  <Image
                    src={productType === "pro" ? pro : titan}
                    alt="product"
                    className="!scale-150"
                  />
                </div>
                <div className="flex w-full flex-col items-start justify-center text-sm">
                  <div className="font-semibold">
                    {productType === "pro" ? "AIRVENT PRO" : "AIRVENT TITAN"}
                  </div>
                  <div className="text-[#6B7280]">
                    {color === "gray" ? "Space Gray" : "Rose Gold"}
                  </div>
                  <div className="text-[#6B7280]">Qty: 1</div>
                </div>
                <div className="flex items-center text-sm font-semibold">
                  ${product.price}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-sm">
                  <div className="text-[#6B7280]">Subtotal</div>
                  <div className="font-semibold">${product.price}</div>
                </div>
                <div className="flex justify-between text-sm">
                  <div className="text-[#6B7280]">Early Bird Discount</div>
                  <div className="font-semibold text-[#10B981]">
                    -${product.price * (product.discount / 100)}
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <div className="text-[#6B7280]">Shipping</div>
                  <div className="font-semibold text-[#10B981]">FREE</div>
                </div>
                <span className="border-b border-[#E5E7EB]" />
              </div>

              <div className="flex justify-between font-semibold">
                <div>TOTAL</div>
                <div>
                  ${product.price - product.price * (product.discount / 100)}
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <span className="border-b border-[#E5E7EB]" />

      {/* Payment Method */}
      <div className="flex flex-col gap-5 py-5">
        <div className="font-lg font-semibold">Payment Method</div>
        <div className="flex flex-col gap-5">
          <div className="w-full overflow-x-auto">
            <div className="w-fit rounded-md border-2 border-[#10B981]">
              <div className="min-w-[340px]">
                <HelioCheckout config={helioConfig} />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 rounded-lg bg-[#DBEAFE] p-4 text-[#1E40AF]">
            <div className="flex items-center gap-1 text-sm font-semibold">
              <ShieldCheck size={16} />
              Secure Payment
            </div>
            <div className="text-xs">
              Your payment is protected by 256-bit SSL encryption and blockchain
              security.
            </div>
          </div>
        </div>
      </div>

      <span className="border-b border-[#E5E7EB]" />

      {/* Notes */}
      <div className="flex flex-col gap-3 py-5">
        <div className="flex items-center gap-3 text-sm font-semibold">
          <Headphones size={18} /> Need Help?
        </div>
        <div className="text-center text-xs text-[#6B7280]">
          Our support team is ready to help with your order
        </div>
        <Button variant="secondary">Get Support</Button>
      </div>
    </div>
  );
};

export default Payment;
