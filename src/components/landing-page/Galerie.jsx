import Image from "next/image";
import React from "react";
import { TtileBg } from "../../../public/images";
import { GalerieDisplay } from "./GalerieDisplay";

const Galerie = () => {
  return (
    <>
      <div className="w-full justify-center items-center flex">
        <Image src={TtileBg} layout="intrinsic" />
        <h1 className="absolute font-inika font-bold text-7xl">Galería</h1>
      </div>
      <p className=" justify-center items-center flex text-center ml-10 mr-10 text-text-gray font-inter text-2xl">
        Descubre el ambiente de nuestro gimnasio a través de esta galería de
        imágenes. Conoce los espacios y equipos con los que contamos.
      </p>
      <div>
        <GalerieDisplay />
      </div>
    </>
  );
};

export default Galerie;
