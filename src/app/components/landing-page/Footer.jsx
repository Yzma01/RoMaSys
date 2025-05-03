"use client";
import React from "react";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import Image from "next/image";
import { Logo } from "@/public/images";

const Footer = () => {
  return (
    <div className="w-full bg-gradient-to-r from-red-0 via-black to-black flex flex-row " id="Contact">
      <div className="flex flex-col text-white pl-4 gap-6 md:pl-10 w-[70vw] xl:w-[80vw] pt-20">
        <label className="flex flex-row items-start gap-2">
          <FmdGoodOutlinedIcon className="text-xl" />
          <p className="text-wrap w-full">
            Ciudad Neily, calle principal a un costado de colosal, donde
            anteriormente era el colegio Catex.
          </p>
        </label>
        <div className="flex flex-col md:flex-row gap-4 md:gap-10">
          <label className="flex flex-row items-center gap-2">
            <LocalPhoneOutlinedIcon className="text-xl" />
            +506 5018-8186
          </label>
        </div>
        <div className="flex items-center pt-10 justify-end gap-4 p-4">
          <div className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-400 hover:bg-gradient-to-r hover:from-blue-900 hover:via-blue-500 hover:to-blue-300">
            <FacebookOutlinedIcon className="w-6 h-6 text-white" />
          </div>
          <div className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-400 hover:bg-gradient-to-r hover:from-yellow-500 hover:via-red-500 hover:via-pink-600 hover:to-purple-800">
            <CameraAltRoundedIcon className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="flex flex-row items-end mt-auto gap-6 md:gap-12">
          <p className="text-white text-sm text-center pb-4">Copyright © 2024</p>
        </div>
      </div>

      <section className="hidden md:flex flex-row items-center justify-center w-full md:w-[40vw] xl:w-[30vw]">
        <div className="flex items-center justify-center w-full">
          <svg height="350" width="100" className="pt-20">
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="200"
              stroke="white"
              strokeWidth="2"
            />
          </svg>
          <div className="flex flex-col items-center gap-4 w-full">
            <Image
              src={Logo}
              width={150}
              height={150}
              alt="Niger Fitness Logo"
            />
            <h1 className="font-inika font-bold text-xl text-white text-center">
              Niger Fitness
            </h1>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;
