"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/UserContext";

import Container from "@/components/Layout/Container";
import { Loading } from "@/components/Layout/Loading";
import Payment from "../../components/Payment";
import Shipping from "../../components/Shipping";
import CheckoutStep from "../../components/CheckoutStep";

type Props = {
  params: Promise<{
    productType: string;
    color: string;
  }>;
};

export default function CheckoutPage({ params }: Props) {
  const router = useRouter();
  const { user, isLoading } = useUser();

  const [step, setStep] = useState<number>(2); // 1: Payment, 2: Shipping
  const [orderId, setOrderId] = useState<string | null>(
    "cmj47bdel000134m79m9926f5",
  );
  const [resolvedParams, setResolvedParams] = useState<{
    productType: string;
    color: string;
  } | null>(null);

  useEffect(() => {
    params.then((p) => setResolvedParams(p));
  }, [params]);

  useEffect(() => {
    if (!isLoading && !user) {
      router.back();
    }
  }, [user, isLoading, router]);

  if (!resolvedParams) {
    return <Loading />;
  }

  if (!isLoading && !user) {
    return null;
  }

  return (
    <>
      <CheckoutStep step={step} />
      <Container className="bg-white">
        {step === 1 && (
          <Payment
            onNext={(id) => {
              setOrderId(id);
              setStep(2);
            }}
          />
        )}
        {step === 2 && orderId && <Shipping orderId={orderId} />}
      </Container>
    </>
  );
}
