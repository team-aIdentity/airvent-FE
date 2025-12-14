"use client";

import React from "react";
import Image from "next/image";

import img1 from "../../assets/Main/img-1.jpg";
import img2 from "../../assets/Main/img-2.jpg";
import img3 from "../../assets/Main/img-3.jpg";
import img4 from "../../assets/Main/img-4.jpg";
import img5 from "../../assets/Main/img-5.jpg";
import img6 from "../../assets/Main/img-6.jpg";

const Title = ({ children }: { children: React.ReactNode }) => {
  return <div className="text-2xl font-bold lg:text-4xl">{children}</div>;
};
const SubTitle = ({ children }: { children: React.ReactNode }) => {
  return <div className="text-sm lg:text-lg">{children}</div>;
};

const Feature = () => {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-4">
      <div className="flex max-w-[1320px] flex-col gap-8 lg:gap-0">
        {/* FEATURES 1 */}
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-0">
          <div className="order-1 lg:order-1">
            <Image src={img1} alt="img" className="w-full object-cover" />
          </div>
          <div className="order-2 flex flex-col gap-2 lg:order-2 lg:gap-6 lg:px-16">
            <Title>Minimal Round Edge Design</Title>
            <SubTitle>
              Not only does it measure air quality accurately,{" "}
              <br className="hidden lg:block" />
              but its simple and stylish design
              <br className="hidden lg:block" /> blends harmoniously into any
              interior.
            </SubTitle>
          </div>
        </div>
        {/* FEATURES 2 */}
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-0">
          <div className="order-1 lg:order-2">
            <Image src={img2} alt="img" className="w-full object-cover" />
          </div>
          <div className="order-2 flex flex-col gap-2 lg:order-1 lg:gap-6 lg:px-16 lg:text-right">
            <Title>Intuitive Signal Lighting</Title>
            <SubTitle>
              Instantly check air quality with signal lighting{" "}
              <br className="hidden lg:block" />
              on the left side of the device,
              <br className="hidden lg:block" />
              indicating particulate matter status in four colors.
            </SubTitle>
          </div>
        </div>
        {/* FEATURES 3 */}
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-0">
          <div className="order-1 lg:order-1">
            <Image src={img3} alt="img" className="w-full object-cover" />
          </div>
          <div className="order-2 flex flex-col gap-2 lg:order-2 lg:gap-6 lg:px-16">
            <Title>Sensor Detects Even Ultrafine Dust</Title>
            <SubTitle>
              The laser scattering method precisely detects 0.3–10㎛ airborne
              particles.
              <br className="hidden lg:block" /> It displays real-time
              measurements, not estimated values.
              <br className="hidden lg:block" /> - Ultrafine dust (PM1.0), fine
              dust (PM2.5), coarse dust (PM10)
            </SubTitle>
          </div>
        </div>
        {/* FEATURES 4 */}
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-0">
          <div className="order-1 lg:order-2">
            <Image src={img4} alt="img" className="w-full object-cover" />
          </div>
          <div className="order-2 flex flex-col gap-2 lg:order-1 lg:gap-6 lg:px-16 lg:text-right">
            <Title>User-Centric Design</Title>
            <SubTitle>
              The minimised touch LCD display and simple, intuitive UI
              <br className="hidden lg:block" />
              let you easily and intuitively check your air quality status.
            </SubTitle>
          </div>
        </div>
        {/* FEATURES 5 */}
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-0">
          <div className="order-1 lg:order-1">
            <Image src={img5} alt="img" className="w-full object-cover" />
          </div>
          <div className="order-2 flex flex-col gap-2 lg:order-2 lg:gap-6 lg:px-16">
            <Title>Multiple Screen Modes</Title>
            <SubTitle>
              Choose which measurement screen you want to view,{" "}
              <br className="hidden lg:block" />
              such as particulate matter or CO<sub>2</sub>.
            </SubTitle>
          </div>
        </div>
        {/* FEATURES 6 */}
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-0">
          <div className="order-1 lg:order-2">
            <Image src={img6} alt="img" className="w-full object-cover" />
          </div>
          <div className="order-2 flex flex-col gap-2 lg:order-1 lg:gap-6 lg:px-16 lg:text-right">
            <Title>Advanced IoT Capabilities</Title>
            <SubTitle>
              Manage air quality data and build a control system
              <br className="hidden lg:block" /> with our dedicated cloud server
              and app.
            </SubTitle>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;
