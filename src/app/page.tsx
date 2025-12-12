"use client";

import Hero from "@/components/Main/Hero";
import ModelLine from "@/components/Main/ModelLine";
import ColorLine from "@/components/Main/ColorLine";
import Feature from "@/components/Main/Feature";
import Detail from "@/components/Main/Detail";
import Specification from "@/components/Main/Specification";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <ModelLine />
      <ColorLine />
      <Feature />
      <Detail />
      <Specification />
    </div>
  );
}
