import Image from "next/image";
import React from "react";
import { TtileBg } from "../../../../public/images";
import { GalerieDisplay } from "./GalerieDisplay";

const Galerie = () => {
  return (
    <>
      <div className="relative w-full flex justify-center items-center">
        <Image
          src={TtileBg}
          layout="intrinsic"
          className="w-full h-auto object-cover md:w-[30vw] md:mx-auto"
        />
        <h1 className="absolute text-center font-inika font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-black">
          Galería
        </h1>
      </div>
      <p className="text-center mx-4 sm:mx-6 md:mx-8 lg:mx-10 text-text-gray font-inter text-lg sm:text-xl md:text-2xl">
        Descubre el ambiente de nuestro gimnasio a través de esta galería de
        imágenes. Conoce los espacios y equipos con los que contamos.
      </p>
      <div className="mt-8">
        <GalerieDisplay />
      </div>
    </>
  );
};

export default Galerie;
