"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

import { useProduct } from "@/hooks/useProduct";
import { useUser } from "@/contexts/UserContext";
import { getData } from "country-list";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";

import { Loading } from "@/components/Layout/Loading";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

import { PRODUCTS, ProductType } from "@/constants/products";
import { type Shipping as ShippingType } from "@/types";

import pro from "@/assets/Product/pro.png";
import titan from "@/assets/Product/pro.png";
import { CheckCircle, Coins, Mail, Truck } from "lucide-react";

interface ShippingProps {
  orderId: string;
  editMode?: boolean;
  onSuccess?: () => void;
}

const Shipping = ({ orderId, editMode = false, onSuccess }: ShippingProps) => {
  const router = useRouter();
  const params = useParams();
  const checkoutColor = params?.color as string;

  const checkoutProduct = useProduct();
  const {
    product: checkoutProductData,
    productType: checkoutProductType,
    isLoading: isCheckoutLoading,
  } = checkoutProduct;

  const { user } = useUser();
  const countries = getData();

  // Order state
  const [order, setOrder] = useState<{
    transactionId: string | null;
    shipping: ShippingType | null;
    productType?: string;
    color?: string;
  } | null>(null);
  const [isLoadingOrder, setIsLoadingOrder] = useState(true);

  // Form state
  const [email, setEmail] = useState(user?.email || "");
  const [evmWalletAddress, setEvmWalletAddress] = useState("");
  const [solanaWalletAddress, setSolanaWalletAddress] = useState("");
  const [country, setCountry] = useState("");
  const [residentRegNumber, setResidentRegNumber] = useState("");
  const [personalClearanceNum, setPersonalClearanceNum] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const productType = editMode
    ? (order?.productType as ProductType)
    : checkoutProductType;
  const color = editMode ? order?.color : checkoutColor;
  const product =
    editMode && order?.productType
      ? PRODUCTS[order.productType as ProductType]
      : checkoutProductData;
  const isLoading = editMode
    ? isLoadingOrder
    : isCheckoutLoading || isLoadingOrder;

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/orders?id=${orderId}`);
        if (res.ok) {
          const data = await res.json();
          setOrder(data.order);

          if (editMode && data.order.shipping) {
            const shipping = data.order.shipping;
            setEmail(shipping.email || user?.email || "");
            setEvmWalletAddress(shipping.evmWalletAddress || "");
            setSolanaWalletAddress(shipping.solanaWalletAddress || "");
            setCountry(shipping.country || "");
            setResidentRegNumber(shipping.residentRegNumber || "");
            setPersonalClearanceNum(shipping.personalClearanceNum || "");
            setFirstName(shipping.firstName || "");
            setLastName(shipping.lastName || "");
            setDateOfBirth(shipping.dateOfBirth || "");
            setStreetAddress(shipping.streetAddress || "");
            setApartment(shipping.apartment || "");
            setCity(shipping.city || "");
            setState(shipping.state || "");
            setPostalCode(shipping.postalCode || "");
            setPhone(shipping.phone || "");
          }
        }
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setIsLoadingOrder(false);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId, editMode, user?.email]);

  const formatTransactionId = (txId: string | null | undefined) => {
    if (!txId) return "Pending...";
    if (txId.length <= 10) return txId;
    return `${txId.slice(0, 6)}...${txId.slice(-4)}`;
  };

  const handleSubmit = async () => {
    // Validation
    if (
      !email ||
      !country ||
      !personalClearanceNum ||
      !firstName ||
      !lastName ||
      !dateOfBirth ||
      !streetAddress ||
      !city ||
      !postalCode ||
      !phone
    ) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/shipping", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          email,
          evmWalletAddress: evmWalletAddress || null,
          solanaWalletAddress: solanaWalletAddress || null,
          country,
          residentRegNumber: residentRegNumber || null,
          personalClearanceNum,
          firstName,
          lastName,
          dateOfBirth,
          streetAddress,
          apartment: apartment || null,
          city,
          state: state || null,
          postalCode,
          phone,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to save shipping information");
      }

      if (editMode && onSuccess) {
        onSuccess();
      } else {
        router.push("/dashboard");
      }
    } catch (error: any) {
      console.error("Error saving shipping:", error);
      alert(error.message || "Failed to save shipping information");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || !product || !productType) {
    return <Loading />;
  }

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col lg:max-w-7xl lg:flex-row lg:items-start lg:gap-12 lg:p-10">
      <div className="flex flex-col gap-5 lg:w-1/2">
        {/* Payment Confirmation Card */}
        {!editMode && (
          <div className="mt-5 flex flex-col gap-3 bg-[#DCFCE7] px-5 py-4 text-[#065F46]">
            <div className="flex items-center gap-2 font-semibold">
              <CheckCircle />
              Payment Confirmed
            </div>
            <div className="text-sm">
              Your crypto payment has been confirmed on the blockchain
            </div>
          </div>
        )}

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
                    <Input
                      placeholder="example@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible defaultValue="item-2">
            <AccordionItem value="item-2">
              <AccordionTrigger className="lg:text-2xl">
                Wallet Configuration{" "}
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-4 text-sm lg:gap-8">
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">
                      EVM Wallet (Rewards)
                    </label>
                    <Input
                      placeholder="0x0333...edefa"
                      value={evmWalletAddress}
                      onChange={(e) => setEvmWalletAddress(e.target.value)}
                    />
                    <span className="text-xs text-[#6B7280]">
                      For claiming additional rewards
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">
                      Solana Wallet (Mining)
                    </label>
                    <Input
                      placeholder="Fp84u...VvB8HC"
                      value={solanaWalletAddress}
                      onChange={(e) => setSolanaWalletAddress(e.target.value)}
                    />
                    <span className="text-xs text-[#6B7280]">
                      Your device will be pre-configured{" "}
                    </span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible defaultValue="item-3">
            <AccordionItem value="item-3">
              <AccordionTrigger className="lg:text-2xl">
                Shipping Address{" "}
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-4 text-sm lg:gap-8">
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Country/Region *</label>
                    <select
                      className="focus-visible:border-ring focus-visible:ring-ring/50 w-full rounded-md border border-[#E5E7EB] bg-transparent px-2 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[1px]"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    >
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
                    <Input
                      placeholder="."
                      value={residentRegNumber}
                      onChange={(e) => setResidentRegNumber(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">
                      Personal Clearance Number *{" "}
                    </label>
                    <Input
                      placeholder="."
                      value={personalClearanceNum}
                      onChange={(e) => setPersonalClearanceNum(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-2">
                      <label className="font-semibold">First Name * </label>
                      <Input
                        placeholder="."
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-semibold">Last Name * </label>
                      <Input
                        placeholder="."
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>{" "}
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Date of Birth * </label>
                    <Input
                      placeholder="05.30.2000"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Street Address *</label>
                    <Input
                      placeholder="."
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">
                      Apartment, suite, etc.
                    </label>
                    <Input
                      placeholder="."
                      value={apartment}
                      onChange={(e) => setApartment(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-2">
                      <label className="font-semibold">City *</label>
                      <Input
                        placeholder="."
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-semibold">State</label>
                      <Input
                        placeholder="."
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                      />
                    </div>
                  </div>{" "}
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Postal Code * </label>
                    <Input
                      placeholder="."
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                    />
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

      {!editMode && (
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
                          {formatTransactionId(order?.transactionId)}
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
                          <CheckCircle size={16} color="#10B981" /> Solana
                          wallet configured
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
            className="mb-4 bg-black text-white hover:bg-black/70"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            Confirm & Continue
          </Button>
        </div>
      )}

      {editMode && (
        <div className="flex flex-col gap-5 lg:w-1/2 lg:rounded-lg lg:px-10">
          <Button
            size="lg"
            className="mb-4 bg-black text-white hover:bg-black/70"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Shipping;
