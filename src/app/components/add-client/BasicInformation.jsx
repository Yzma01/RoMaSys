"use client";
import React, { useState } from "react";
import FormInput from "./FormInput";
import MonthlyType from "./MonthlyType";
import HasRutine from "./HasRutine";
import Button from "../utils/Button";
import { makeFetch } from "../utils/fetch";
import { useToast } from "@/hooks/use-toast";

export const Title = ({ title }) => {
  return (
    <p className="text-base sm:text-lg text-gray-3 font-bold -translate-x-10">
      {title}
    </p>
  );
};

const BasicInformation = ({
  routine,
  setRoutine,
  gender,
  height,
  weight,
  goal,
  birthdate,
  setHeight,
  setWeight,
  setGoal,
  setDate,
  setGender,
}) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [lastname1, setLastname1] = useState("");
  const [lastname2, setLastname2] = useState("");
  const [phone, setPhone] = useState("");
  const [monthlyType, setMothlyType] = useState("");
  const [amount, setAmount] = useState("");
  const { toast } = useToast();

  const clearForm = () => {
    setId("");
    setName("");
    setLastname1("");
    setLastname2("");
    setPhone("");
    setMothlyType("");
    setAmount("");
    setRoutine(false);
    setHeight("");
    setWeight("");
    setGoal("");
    setDate("");
  };

  const validate = (message, status, code) => {
    if (status == code) {
      toast({ description: message });
      if (code == 201) {
        clearForm();
      }
    }
    return;
  };

  const verifiedNull = () => {
    console.log(gender);
    console.log(id);
    console.log(name);
    console.log(routine);
    if (
      id == "" ||
      name == "" ||
      lastname1 == "" ||
      lastname2 == "" ||
      phone == "" ||
      monthlyType == "" ||
      amount == ""
    ) {
      console.log("first");
      if (routine) {
        console.log("second");
        console.log(gender)
        console.log(weight)
        console.log(height)
        console.log(birthdate)
        if (
          height == "" ||
          weight == "" ||
          goal == "" ||
          gender == "" ||
          birthdate == undefined || birthdate == ""
        ) {
          console.log("third");
          return true;
        }
      } else {
        return true;
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const body = {
      cli_id: id,
      cli_name: name,
      cli_last_name1: lastname1,
      cli_last_name2: lastname2,
      cli_monthly_payment_type: monthlyType.toLowerCase(),
      cli_phone: phone,
      cli_frozen: false,
      cli_remaining_days: 0,
      cli_register_date: new Date(),
      cli_next_pay_date: "2024-10-01T00:00:00.000Z",
      cli_adittional_data: !routine ? null: {
        cli_goal: goal,
        cli_gender: gender,
        cli_height: height,
        cli_weight: weight,
        cli_birthdate: birthdate,
      },
    };
    if (verifiedNull()) {
      toast({ description: "Por favor llene todos los campos." });
    }
    console.log(body)
    const response = await makeFetch(
      "/api/CRUD/clients-repo",
      "POST",
      "",
      body
    );
    console.log(response)
    validate(`${name} ha sido agregado.`, response.status, 201);
    validate(`El cliente cédula: ${id} ya existe.`, response.status, 401);
    validate(
      `El número de teléfono: ${phone} ya está registrado`,
      response.status,
      406
    );
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
            <HasRutine checked={routine} setChecked={setRoutine} />
            <br />
            <div
              className={`${
                routine && "items-center justify-center flex w-full"
              }`}
            >
              <Button
                onClick={(e) => handleSubmit(e)}
                color={"green"}
                text={"Guardar"}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BasicInformation;
