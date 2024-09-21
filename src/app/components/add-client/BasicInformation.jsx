"use client";
import React, { useState } from "react";
import FormInput from "./FormInput";
import MonthlyType from "./MonthlyType";
import HasRutine from "./HasRutine";
import Button from "../utils/Button";
import { makeFetch } from "../utils/fetch";
import { useToast } from "@/hooks/use-toast";

const Title = ({ title }) => {
  return (
    <p className="text-base sm:text-lg text-gray-3 font-bold -translate-x-10">
      {title}
    </p>
  );
};

const BasicInformation = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [lastname1, setLastname1] = useState("");
  const [lastname2, setLastname2] = useState("");
  const [phone, setPhone] = useState("");
  const [monthlyType, setMothlyType] = useState("");
  const [amount, setAmount] = useState("");
  const { toast } = useToast();

  const handleSubmit = () => {
    const body = {
      cli_id: id,
      cli_name: name,
      cli_last_name1: lastname1,
      cli_last_name2: lastname2,
      cli_monthly_payment_type: monthlyType,
      cli_phone: phone,
      cli_frozen: false,
      cli_remaining_days: 30,
      cli_register_date: new Date(),
      cli_rutine: false,
      cli_next_pay_date: "2024-10-01T00:00:00.000Z",
      cli_goals: "",
      cli_gender: "",
      cli_height: 0,
      cli_weight: 0,
      cli_birthdate: "",
    };

    const response = makeFetch("/api/CRUD/clients-repo", "POST", "", body);
    if (response == 200) {
      toast({
        description: `${name} ha sido agregado.`,
      });
    }
  };
  return (
    <div className="flex justify-center items-center w-full">
      <form className="flex flex-col gap-6 pl-20">
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
        <div className="flex flex-row gap-2">
          <div className="flex flex-col">
            <Title title={"Mensualidad"} />
            <MonthlyType value={monthlyType} setValue={setMothlyType} />
          </div>
          <div>
            <FormInput
              value={amount}
              placeholder={"Monto"}
              setValue={setAmount}
            />
            <HasRutine />
            <br />
            <Button
              onClick={() => handleSubmit()}
              color={"green"}
              text={"Guardar"}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default BasicInformation;
