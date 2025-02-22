"use client";
import React, { useState } from "react";
import GenderSelector from "./GenderSelector";
import { Title } from "./BasicInformation";
import FormInput from "./FormInput";
import { Filter } from "../utils/Filter";
import { DatePicker } from "./DatePicker";

const goals = [
  {
    value: "Pérdida de peso",
    label: "Pérdida de peso",
  },
  {
    value: "Ganancia de masa muscular",
    label: "Ganancia de masa muscular",
  },
  {
    value: "tonificacion",
    label: "tonificacion",
  },
  {
    value: "Mejora de la salud en general",
    label: "Mejora de la salud en general",
  },
];
const AdditionalInformation = ({
  height,
  setHeight,
  weight,
  setWeight,
  goal,
  setGoal,
  date,
  setDate,
  gender,
  setGender
}) => {
  return (
    <div className="flex flex-col h-full pl-20 pr-20">
      <GenderSelector gender={gender} setGender={setGender} />
      <div className="flex flex-row pt-10 gap-5">
        <div className="flex flex-col justify-center items-center">
          <Title title={"Altura"} />
          <FormInput placeholder={"cm"} value={height} setValue={setHeight} />
        </div>
        <div className="flex flex-col justify-center items-center">
          <Title title={"Peso"} />
          <FormInput placeholder={"kg"} value={weight} setValue={setWeight} />
        </div>
      </div>
          {/* <div className="">
            <Title title={"Correo Electrónico"}/>
            <FormInput placeholder={"Email"} value={email} setValue={setEmail} />
          </div> */}
      <div className="flex flex-col">
        <div className="flex flex-col pb-10 gap-2">
          <Title title={"Objetivos"} />
          <Filter
            frameworks={goals}
            text={"Objetivos"}
            icon={false}
            className={"border border-gray-500 pl-5 pr-5 rounded-2xl"}
            value={goal}
            setValue={setGoal}
          />
        </div>
        <div className="flex flex-col gap-2 pb-10">
          <Title title={"Fecha de Nacimiento"} />

          <DatePicker
            label="Event Date"
            variant="bordered"
            date={date}
            setDate={setDate}
            hideTimeZone
            showMonthAndYearPickers
          />
        </div>
      </div>
    </div>
  );
};

export default AdditionalInformation;
