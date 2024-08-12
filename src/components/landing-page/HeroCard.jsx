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
    <div className="flex flex-row w-full ml-3 mr-3 items-center justify-center">
      {items.map(({ title, logo, description }, index) => (
        <div
          key={index}
          className="h-[300px] w-[500px] flex flex-col items-center justify-center text-center pl-4 pr-4 border rounded-tr-[4rem] rounded-bl-[5rem] m-3 -translate-y-24 bg-white shadow-gray-400 shadow-lg"
        >
          <div className="w-full flex items-center justify-center">
            <Image src={logo} alt={title} layout="intrinsic" />
          </div>
          <h1
            className={`font-inknut font-bold text-2xl ${
              index === 1 ? "text-black" : "text-red"
            }`}
          >
            {title}
          </h1>
          <p className="text-wrap font-inter text-lg text-text-gray">{description}</p>
        </div>
      ))}
    </div>
  );
};

export default HeroCard;
