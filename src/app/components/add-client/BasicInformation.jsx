"use client";
import React from "react";
import FormInput from "./FormInput";
import MonthlyType from "./MonthlyType";
import HasRutine from "./HasRutine";

export const Title = ({ title }) => {
  return (
    <p className="text-base sm:text-lg text-gray-3 font-bold -translate-x-10">
      {title}
    </p>
  );
};

const BasicInformation = ({
  id,
  modify,
  name,
  lastname1,
  lastname2,
  phone,
  monthlyType,
  amount,
  routine,
  setRoutine,
  setId,
  setName,
  setLastname1,
  setLastname2,
  setPhone,
  setMothlyType,
  setAmount,
  email, setEmail
}) => {
  return (
    <div className="flex justify-center items-center w-full">
      <form className="flex flex-col gap-0 pl-20">
        <Title title={"Datos del Cliente"} />
        <FormInput value={id} placeholder={"Cédula"} setValue={setId} />
        <FormInput value={name} placeholder={"Nombre"} setValue={setName} />
        <FormInput
          value={lastname1}
          placeholder={"Primer Apellido"}
          setValue={setLastname1}
        />
        <FormInput
          value={lastname2}
          placeholder={"Segundo Apellido"}
          setValue={setLastname2}
        />
        <FormInput value={phone} placeholder={"Teléfono"} setValue={setPhone} />

        <FormInput value={email} placeholder={"Correo Electrónico"} setValue={setEmail} />

        <div className="flex flex-row gap-2">
          <div className="flex flex-col">
            <Title title={"Mensualidad"} />
            <MonthlyType value={monthlyType} setValue={setMothlyType} />
          </div>
          <div>
            {!modify && (
              <FormInput
                value={amount}
                placeholder={"Monto"}
                setValue={setAmount}
              />
            )}
            <HasRutine checked={routine} setChecked={setRoutine} />
            <br />
            <div
              className={`${
                routine && "items-center justify-center flex w-full"
              }`}
            ></div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BasicInformation;
