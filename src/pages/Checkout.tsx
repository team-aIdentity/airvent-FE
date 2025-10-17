import React, { useState } from "react";
import Container from "@/components/Layout/Container";
import Payment from "@/components/Checkout/Payment";
import Shipping from "@/components/Checkout/Shipping";
import CheckoutStep from "@/components/Checkout/CheckoutStep";

const Checkout = () => {
  const [step, setStep] = useState<number>(1); // 1: Payment, 2: Shipping
  return (
    <>
      <CheckoutStep step={step} />
      <Container className="bg-white">
        {step === 1 && <Payment onNext={() => setStep(2)} />}
        {step === 2 && <Shipping />}
      </Container>
    </>
  );
};

export default Checkout;
