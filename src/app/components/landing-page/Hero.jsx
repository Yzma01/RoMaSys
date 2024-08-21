import { HeroImg, Logo } from "@/public/images";
import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <>
      <div className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[70vh]" id="Hero">
        <Image
          src={HeroImg}
          layout="fill"
          objectFit="cover"
          alt="Hero Image"
          className="w-full h-full"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center sm:items-end lg:items-end lg:justify-center lg:mr-10 p-5 sm:p-10">
          <div className="flex flex-col items-center sm:items-end sm:ml-auto sm:mr-10 lg:mr-20 justify-center">
            <h1 className="font-inika font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white hidden sm:block mb-3 sm:mb-5">
              Niger Fitness
            </h1>
            <Image
              src={''}
              width={80}
              height={80}
              alt="Logo"
              className="-translate-x-10 hidden sm:block w-[60px] sm:w-[100px] md:w-[150px] lg:w-[200px] xl:w-[250px] h-auto"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
