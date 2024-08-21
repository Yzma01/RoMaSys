import { TtileBg } from "@/public/images";
import Image from "next/image";
import React from "react";

const Membership = () => {
  return (
    <div>
      <div className="relative w-full flex justify-center items-center">
        <Image
          src={TtileBg}
          layout="intrinsic"
          width={500}
          className="w-full h-auto object-cover md:w-[30vw] md:mx-auto"
        />
        <h1 className="absolute text-center font-inika font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-black">
          Membresías
        </h1>
      </div>
    </div>
  );
};

export default Membership;
