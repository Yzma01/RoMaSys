import React from "react";
import { CardioLogo, MachineLogo, WeightLogo } from "../../../public/images";
import Image from "next/image";

const items = [
  {
    title: "Área de cardio",
    logo: CardioLogo,
    description:
      "Equipos como cintas de correr, bicicletas estáticas para ejercicios cardiovasculares.",
  },
  {
    title: "Área de pesas libres",
    logo: WeightLogo,
    description:
      "Incluye mancuernas, barras, pesas y bancos para realizar ejercicios de levantamiento de peso libre.",
  },
  {
    title: "Área de máquinas de pesas",
    logo: MachineLogo,
    description:
      "Equipos de resistencia asistida que guían el movimiento y permiten trabajar músculos específicos.",
  },
];

const HeroCard = () => {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center mx-3">
      {items.map(({ title, logo, description }, index) => (
        <div
          key={index}
          className="h-auto w-full sm:w-[250px] md:w-[300px] lg:w-[350px] xl:w-[400px] flex flex-col items-center justify-center text-center p-4 border rounded-tr-[1rem] -translate-y-24 rounded-bl-[1rem] m-3 bg-white shadow-gray-400 shadow-lg"
        >
          <div className="w-full flex items-center justify-center mb-4">
            <Image src={logo} alt={title} layout="intrinsic" width={80} height={80} />
          </div>
          <h1
            className={`font-inknut font-bold text-lg sm:text-lg md:text-2xl ${
              index === 1 ? "text-black" : "text-red"
            }`}
          >
            {title}
          </h1>
          <p className="text-wrap font-inter text-base sm:text-sm md:text-base text-text-gray">
            {description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default HeroCard;
