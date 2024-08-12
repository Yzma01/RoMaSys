import { TtileBg } from "@/public/images";
import Image from "next/image";
import React from "react";

const Membership = () => {
  return (
    <div>
      <div className="w-full justify-center items-center flex">
        <Image src={TtileBg} layout="intrinsic" width={500}/>
        <h1 className="absolute font-inika font-bold text-7xl">Membresias</h1>
      </div>
    </div>
  );
};

export default Membership;
