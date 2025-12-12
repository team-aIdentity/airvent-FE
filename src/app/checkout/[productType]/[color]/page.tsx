"use client";

import React, { useState } from "react";
import Container from "@/components/Layout/Container";
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
  const [step, setStep] = useState<number>(2); // 1: Payment, 2: Shipping
  const [resolvedParams, setResolvedParams] = useState<{
    productType: string;
    color: string;
  } | null>(null);

  React.useEffect(() => {
    params.then((p) => setResolvedParams(p));
  }, [params]);

  if (!resolvedParams) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <CheckoutStep step={step} />
      <Container className="bg-white">
        {step === 1 && <Payment onNext={() => setStep(2)} />}
        {step === 2 && <Shipping />}
      </Container>
    </>
  );
}
