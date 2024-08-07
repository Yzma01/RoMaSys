import { HeroImg, Logo } from "@/src/app/public/images";
import Image from "next/image";
import React from "react";
import HeroCard from "./HeroCard";

const Hero = () => {
  return (
    <>
    <div className="relative w-full h-[50vh]">
      <Image src={HeroImg} layout="responsive" objectFit="cover" alt="Hero Image" />
      <div className="absolute inset-0 flex flex-col justify-center ml-[60vw] z-10"> //!Agregar responsividad
        <h1 className="font-inika font-bold text-7xl text-white">Gym Box</h1>
        <Image src={Logo} width={300} height={300} alt="Logo" />
      </div>
    </div>
    <HeroCard />
    </>
  );
};

export default Hero;
