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
import { Clock, Coins, Headphones, Shield, ShieldCheck } from "lucide-react";

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
    <div className="mx-auto flex w-full max-w-xl flex-col lg:max-w-7xl lg:flex-row lg:items-start lg:gap-12 lg:p-10">
      {/* Order Summary */}
      <div className="flex flex-col gap-5 lg:w-1/2 lg:rounded-lg lg:px-10">
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
                      {productType === "pro" ? "AIRVENT PRO" : "AIRVENT TITAN"}
                    </div>
                    <div className="text-[#6B7280]">
                      {color === "gray" ? "Space Gray" : "Rose Gold"}
                    </div>
                    <div className="text-[#6B7280]">Qty: 1</div>
                  </div>
                  <div className="flex items-center text-sm font-semibold lg:text-lg">
                    ${product.price}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-sm lg:text-base">
                    <div className="text-[#6B7280]">Subtotal</div>
                    <div className="font-semibold">${product.price}</div>
                  </div>
                  <div className="flex justify-between text-sm lg:text-base">
                    <div className="text-[#6B7280]">Early Bird Discount</div>
                    <div className="font-semibold text-[#10B981]">
                      -${Math.round(product.price * (product.discount / 100))}
                    </div>
                  </div>
                  <div className="flex justify-between text-sm lg:text-base">
                    <div className="text-[#6B7280]">Shipping</div>
                    <div className="font-semibold text-[#10B981]">FREE</div>
                  </div>
                  <span className="border-b border-[#E5E7EB]" />
                </div>

                <div className="flex justify-between font-semibold lg:text-lg">
                  <div>TOTAL</div>
                  <div>
                    $
                    {Math.round(
                      product.price - product.price * (product.discount / 100),
                    )}
                  </div>
                </div>

                {/* Desktop Notes */}
                <div className="hidden flex-col gap-3 text-[#374151] lg:flex">
                  <div className="text-base font-semibold">Important Notes</div>
                  <div className="flex flex-col gap-2 text-sm text-[#6B7280]">
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      Estimated delivery: 7-14 business days
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield size={16} />
                      2-year manufacturer warranty included{" "}
                    </div>
                    <div className="flex items-center gap-2">
                      <Coins size={16} />
                      Start earning tokens immediately after setup{" "}
                    </div>
                  </div>
                </div>
                <div className="hidden flex-col gap-3 rounded-lg bg-[#F0FDF4] p-5 lg:flex">
                  <div className="flex items-center gap-3 font-semibold">
                    <Headphones size={20} /> Need Help?
                  </div>
                  <div className="text-sm text-[#374151]">
                    Contact our support team if you have any questions about
                    your order or DePIN setup.{" "}
                  </div>
                  <Button>Get Support</Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <span className="border-b border-[#E5E7EB] lg:h-screen lg:border-r lg:border-b-0" />

      {/* Payment Method */}
      <div className="flex flex-col gap-5 py-5">
        <div className="text-lg font-semibold lg:text-2xl">Payment Method</div>
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

      {/* Mobile Notes */}
      <div className="flex flex-col gap-3 py-5 lg:hidden">
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
