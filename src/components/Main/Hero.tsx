"use client";

import React from "react";
import Image from "next/image";

import mainImage from "../../assets/Main/img-1.jpg"; // TODO: 메인 이미지 받아야함..
import logo from "../../assets/Main/airam-e-series-white.png";

const Hero = () => {
  return (
    <section className="flex items-center justify-center">
      <div
        className="relative flex w-full flex-col bg-black/90 px-6 py-24 text-center text-white md:px-16 md:py-60"
        style={{
          backgroundImage: `url(${mainImage.src || mainImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex flex-col gap-4 md:gap-8">
          <p className="text-lg font-semibold tracking-widest text-blue-400 md:text-3xl">
            For an Airam Life
          </p>
          <h1 className="text-xl leading-tight font-bold md:text-4xl">
            AIRAM is with your space.
          </h1>
          <p className="text-xs leading-5 font-semibold md:hidden">
            With precision sensors and intelligent algorithms,
            <br /> AIRAM monitors particulate matter, CO₂,
            <br />
            harmful chemicals, temperature, and humidity <br />
            in real time.
          </p>
          <p className="hidden text-lg leading-8 font-semibold md:block">
            With precision sensors and intelligent algorithms, AIRAM monitors
            <br /> particulate matter, CO₂, harmful chemicals, temperature, and
            humidity in real time.
          </p>
          <Image
            src={logo}
            alt="AIRAM"
            className="mt-4 h-10 object-contain md:h-18"
            style={{ maxWidth: "100%" }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
