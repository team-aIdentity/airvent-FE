"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
import { formatDate } from "../utils/formatDate";
import { PRODUCTS, type ProductType } from "@/constants/products";

import Container from "@/components/Layout/Container";
import Shipping from "@/app/checkout/components/Shipping";
import { Loading } from "@/components/Layout/Loading";
import { Button } from "@/components/ui/button";
import { Order } from "@/types";
import { ArrowLeft, MapPin, Check, Truck, Box } from "lucide-react";

import pro from "@/assets/Product/pro.png";
import titan from "@/assets/Product/pro.png";

const OrderDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const orderId = params?.orderId as string;
  const { user, isLoading: userLoading } = useUser();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchOrder = async () => {
    if (!user || !orderId) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`/api/orders?id=${orderId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch order information.");
      }

      const data = await response.json();
      setOrder(data.order);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error has occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!userLoading) {
      fetchOrder();
    }
  }, [user, userLoading, orderId]);

  const handleEditSuccess = () => {
    setIsEditing(false);
    fetchOrder();
  };

  if (isLoading || userLoading) {
    return <Loading withContainer />;
  }

  if (!isLoading && !user) {
    return null;
  }

  if (error) {
    return (
      <Container className="bg-white py-5">
        <div className="mx-auto flex w-full max-w-xl flex-col lg:max-w-7xl">
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-800 lg:p-5">
            {error}
          </div>
        </div>
      </Container>
    );
  }

  if (!order) {
    return (
      <Container className="bg-white py-5">
        <div className="mx-auto flex w-full max-w-xl flex-col lg:max-w-7xl">
          <p className="w-full text-center text-gray-600">Order not found.</p>
        </div>
      </Container>
    );
  }

  if (isEditing) {
    return (
      <Container className="bg-white">
        <Shipping
          orderId={orderId}
          editMode={true}
          onSuccess={handleEditSuccess}
        />
      </Container>
    );
  }

  const product = PRODUCTS[order.productType as ProductType];

  return (
    <Container className="bg-white !px-0 lg:bg-[#F9FAFB]">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => router.push("/dashboard")}
        className="mb-2 w-fit lg:hidden"
      >
        <ArrowLeft size={16} className="mr-2" />
        Back to Orders
      </Button>
      <div className="flex w-full flex-col items-center gap-1 bg-[#EFF6FF] p-4">
        <span className="text-xs font-semibold text-[#1E40AF] lg:text-base">
          Order ID
        </span>
        <span className="text-[11px] text-[#3B82F6] lg:text-sm">
          {order.id}
        </span>
      </div>

      <div className="mx-auto flex w-full max-w-xl flex-col lg:max-w-7xl lg:flex-row lg:items-start lg:gap-8 lg:py-10">
        {/* left */}
        <div className="flex flex-col gap-5 lg:w-1/2">
          {/* Order Summary */}
          <div className="flex flex-col border-b p-4 lg:overflow-hidden lg:rounded-lg lg:border lg:bg-white lg:p-8 lg:shadow-sm">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4 lg:gap-8">
                <div className="flex justify-between gap-3">
                  <div className="flex h-15 w-15 min-w-15 items-center justify-center overflow-hidden rounded-md border border-[#E5E7EB] bg-[#F9FAFB] p-2 lg:h-20 lg:w-20 lg:min-w-20">
                    <Image
                      src={order.productType === "pro" ? pro : titan}
                      alt="product"
                      className="!scale-150"
                    />
                  </div>
                  <div className="flex w-full flex-col items-start justify-center text-sm lg:text-lg">
                    <div className="font-semibold">
                      {order.productType === "pro"
                        ? "AIRVENT PRO"
                        : "AIRVENT TITAN"}
                    </div>
                    <div className="text-[#6B7280]">
                      {order.color === "gray" ? "Space Gray" : "Rose Gold"}
                    </div>
                    <div className="text-[#6B7280]">Qty: 1</div>
                  </div>
                  <div className="flex items-center text-sm font-semibold lg:text-lg">
                    ${order.price}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex justify-between text-sm lg:text-base">
                    <div className="text-[#6B7280]">
                      {order.productType === "pro"
                        ? "Airvent Pro"
                        : "Airvent Titan"}
                    </div>
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
              </div>
            </div>
          </div>
        </div>

        {/* right */}
        <div className="lg:flex lg:w-1/2 lg:flex-col lg:gap-8">
          {/* Order Status */}
          <div className="flex flex-col gap-5 border-b bg-[#F9FAFB] p-4 lg:overflow-hidden lg:rounded-lg lg:border lg:bg-white lg:p-6 lg:shadow-sm">
            <h2 className="font-bold lg:text-xl">Order Status</h2>
            <div className="flex flex-col gap-3 lg:gap-4">
              <div className="flex items-center justify-between gap-1">
                {/* Left */}
                <div className="flex items-center">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#10B981] lg:h-8 lg:w-8">
                    <Check color="white" size={12} />
                  </span>
                </div>
                {/* Middle */}
                <div className="flex flex-1 flex-col px-2">
                  <span className="text-sm font-semibold lg:text-base">
                    Payment Received
                  </span>
                  <span className="text-xs text-[#6B7280]">
                    {formatDate(order.createdAt, "time")}
                  </span>
                </div>
                {/* Right */}
                <div className="min-w-fit text-right text-xs font-medium text-[#6B7280] lg:text-sm">
                  {formatDate(order.createdAt, "date")}
                </div>
              </div>
              {order.status === "shipping" && order.shipping?.shippedAt && (
                <div className="flex items-center justify-between gap-1">
                  <div className="flex items-center">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#3B82F6] lg:h-8 lg:w-8">
                      <Box color="white" size={14} />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col px-2">
                    <span className="text-sm font-semibold lg:text-base">
                      Shipping
                    </span>
                  </div>
                  <div className="min-w-fit text-right text-xs font-medium text-[#6B7280] lg:text-sm">
                    {formatDate(order.shipping.shippedAt, "date")}
                  </div>
                </div>
              )}
              {order.status === "delivered" && order.shipping?.deliveredAt && (
                <div className="flex items-center justify-between gap-1">
                  <div className="flex items-center">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#3B82F6] lg:h-8 lg:w-8">
                      <Box color="white" size={14} />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col px-2">
                    <span className="text-sm font-semibold lg:text-base">
                      Delivered
                    </span>
                  </div>
                  <div className="min-w-fit text-right text-xs font-medium text-[#6B7280] lg:text-sm">
                    {formatDate(order.shipping.deliveredAt, "date")}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Contact Information */}
          {order.shipping && (
            <div className="flex flex-col gap-5 border-b p-4 lg:overflow-hidden lg:rounded-lg lg:border lg:bg-white lg:p-6 lg:shadow-sm">
              <h2 className="font-bold lg:text-xl">Contact Information</h2>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex flex-col">
                    <span className="text-xs text-[#6B7280] lg:text-sm">
                      Email
                    </span>
                    <span className="text-sm font-medium lg:text-base">
                      {order.shipping.email}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex flex-col">
                    <span className="text-xs text-[#6B7280] lg:text-sm">
                      Phone
                    </span>
                    <span className="text-sm font-medium lg:text-base">
                      {order.shipping.phone}
                    </span>
                  </div>
                </div>
                {(order.shipping.evmWalletAddress ||
                  order.shipping.solanaWalletAddress) && (
                  <div className="flex flex-col gap-2">
                    <span className="text-xs text-[#6B7280] lg:text-sm">
                      Wallet Addresses
                    </span>
                    {order.shipping.evmWalletAddress && (
                      <div className="text-sm lg:text-base">
                        <span className="font-medium">EVM: </span>
                        <span className="text-[#6B7280]">
                          {order.shipping.evmWalletAddress.length > 20
                            ? `${order.shipping.evmWalletAddress.slice(0, 10)}...${order.shipping.evmWalletAddress.slice(-8)}`
                            : order.shipping.evmWalletAddress}
                        </span>
                      </div>
                    )}
                    {order.shipping.solanaWalletAddress && (
                      <div className="text-sm lg:text-base">
                        <span className="font-medium">Solana: </span>
                        <span className="text-[#6B7280]">
                          {order.shipping.solanaWalletAddress.length > 20
                            ? `${order.shipping.solanaWalletAddress.slice(0, 10)}...${order.shipping.solanaWalletAddress.slice(-8)}`
                            : order.shipping.solanaWalletAddress}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Shipping Information */}
          {order.shipping && (
            <div className="flex flex-col gap-5 border-b bg-[#F9FAFB] p-4 lg:overflow-hidden lg:rounded-lg lg:border lg:bg-white lg:p-6 lg:shadow-sm">
              <h2 className="font-bold lg:text-xl">Shipping Information</h2>
              <div className="flex flex-col gap-2">
                <div className="flex items-start gap-2">
                  <MapPin size={16} className="mt-1 text-[#6B7280]" />
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-[#6B7280] lg:text-sm">
                      Shipping Address
                    </span>
                    <div className="text-sm font-medium lg:text-base">
                      {order.shipping.firstName} {order.shipping.lastName}
                    </div>
                    <div className="text-sm text-[#6B7280] lg:text-base">
                      {order.shipping.streetAddress}
                      {order.shipping.apartment &&
                        `, ${order.shipping.apartment}`}
                    </div>
                    <div className="text-sm text-[#6B7280] lg:text-base">
                      {order.shipping.city}
                      {order.shipping.state && `, ${order.shipping.state}`}{" "}
                      {order.shipping.postalCode}
                    </div>
                    <div className="text-sm text-[#6B7280] lg:text-base">
                      {order.shipping.country}
                    </div>
                  </div>
                </div>
                <div className="mt-2 flex flex-col gap-2 border-t pt-4">
                  {order.shipping.residentRegNumber && (
                    <div className="flex justify-between">
                      <span className="text-xs text-[#6B7280] lg:text-sm">
                        Resident Registration Number
                      </span>
                      <span className="text-sm font-medium lg:text-base">
                        {order.shipping.residentRegNumber}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-xs text-[#6B7280] lg:text-sm">
                      Personal Clearance Number
                    </span>
                    <span className="text-sm font-medium lg:text-base">
                      {order.shipping.personalClearanceNum}
                    </span>
                  </div>
                </div>
              </div>
              {user?.id === order.userId && (
                <Button variant="secondary" onClick={() => setIsEditing(true)}>
                  Edit Information
                </Button>
              )}
            </div>
          )}

          {!order.shipping && (
            <Button variant="destructive">Add Shipping Information</Button>
          )}
        </div>
      </div>
    </Container>
  );
};

export default OrderDetailPage;
