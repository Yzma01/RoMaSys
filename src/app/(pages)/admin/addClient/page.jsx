"use client";
import BasicInformation from "@/src/app/components/add-client/BasicInformation";
import React, { useState } from "react";
import Routine from "@/src/app/components/add-client/Routine";
import { AnimatePresence, motion } from "framer-motion";
import Button from "@/src/app/components/utils/Button";
import { useToast } from "@/hooks/use-toast";
import { makeFetch } from "@/src/app/components/utils/fetch";
import { useNavigate } from "react-router-dom";
import Loader from "@/src/app/components/utils/Loader";

export default function AddClient() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [lastname1, setLastname1] = useState("");
  const [lastname2, setLastname2] = useState("");
  const [phone, setPhone] = useState("");
  const [monthlyType, setMothlyType] = useState("");
  const [amount, setAmount] = useState("");
  const [routine, setRoutine] = useState(false);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [goal, setGoal] = useState("");
  const [date, setDate] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  const navigate = useNavigate();

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
    setGender("");
    setEmail("");
  };

  const validate = (message, status, code, title) => {
    if (status == code) {
      toast({ description: message, title: title });
      return;
    }
    if (status == 201) {
      clearForm();
      navigate("/admin/dashboard");
    }
    return;
  };

  const verifiedNegative = () => {
    const regex = /-+/;
    return (
      regex.test(amount) ||
      regex.test(weight) ||
      regex.test(height) ||
      regex.test(phone)
    );
  };

  const verifiedValidEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const verifiedBirthday = () => {
    const today = new Date();
    return date > today ? true : false;
  };

  const verifiedNull = () => {
    if (
      id == "" ||
      name == "" ||
      lastname1 == "" ||
      lastname2 == "" ||
      phone == "" ||
      email == "" ||
      monthlyType == "" ||
      amount == ""
    ) {
      return true;
    }
    if (routine) {
      if (
        height == "" ||
        weight == "" ||
        goal == "" ||
        gender == "" ||
        date == undefined ||
        date == ""
      ) {
        return true;
      }
    }
    return false;
  };

  const doVerifications = (response) => {
    console.log("Verficaciones 🐴🐴: ", response)
    validate(`${name} ha sido agregado.`, response.status, 201);
    validate(
      `Error de conexión, si el problema persiste contacte a soporte.`,
      response.status,
      500,
      "Error"
    );
    validate(
      `El cliente cédula: ${id} ya existe.`,
      response.status,
      401,
      "Error"
    );
    validate(
      `El número de teléfono: ${phone} ya está registrado`,
      response.status,
      406,
      "Error"
    );
    validate(
      `El correo eléctronico ${email} ya está registrado`,
      response.status,
      409, "Error"
    );
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
      cli_email: email,
      cli_frozen: false,
      cli_remaining_days: 0,
      cli_register_date: new Date(),
      cli_rutine: routine,
      pay_amount: amount.includes(",") ? amount.replace(",", "") : amount,
      cli_next_pay_date: "2024-10-01T00:00:00.000Z",
      cli_additional_data: !routine
        ? null
        : {
            cli_goal: goal,
            cli_gender: gender,
            cli_height: height,
            cli_weight: weight,
            cli_birthdate: date,
          },
    };
    setLoading(true);
    await doFechtVerifications(body);
  };

  const doFechtVerifications = async (body) => {
    if (verifiedBirthday()) {
      toast({
        description: "La fecha de nacimiento es mayor a la actual",
        title: "Error",
      });
      setLoading(false);
      return;
    }
    if (!verifiedValidEmail()) {
      toast({ description: "Correo electrónico no válido", title: "Error" });
      setLoading(false);
      return;
    }
    if (verifiedNegative()) {
      toast({
        description: "Los números no pueden ser negativos",
        title: "Error",
      });
      setLoading(false);
      return;
    }
    if (verifiedNull()) {
      toast({
        description: "Por favor llene todos los campos.",
        title: "Error",
      });
      setLoading(false);
    } else {
      const response = await makeFetch("/api/clients", "POST", "", body);
      console.log("Responseeeeeeeee:", response);
      doVerifications(response);
    }
  };
  return (
    <div className="bg-adminBackground flex items-center justify-center min-h-screen w-full">
      {loading ? (
        <Loader />
      ) : (
        <AnimatePresence>
          <motion.div
            className="overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            <div className="flex flex-col text-white p-5 w-full max-w-screen-lg mx-auto">
              {/* <h1 className="text-xl sm:text-2xl mb-2 font-bold">
              Agregar Cliente
            </h1> */}
              <div className="p-6 sm:p-8 md:p-10 lg:p-12 bg-blueDark text-white rounded-3xl shadow-lg border border-gray-3 w-full">
                <section>
                  <header className="flex flex-col sm:flex-row items-center justify-between">
                    <div className="flex flex-row w-full sm:w-3/4 mb-4 sm:mb-0 gap-10 -mr-28">
                      <BasicInformation
                        modify={false}
                        id={id}
                        name={name}
                        lastname1={lastname1}
                        lastname2={lastname2}
                        phone={phone}
                        monthlyType={monthlyType}
                        amount={amount}
                        routine={routine}
                        setRoutine={setRoutine}
                        setId={setId}
                        setName={setName}
                        setLastname1={setLastname1}
                        setLastname2={setLastname2}
                        setPhone={setPhone}
                        setMothlyType={setMothlyType}
                        setAmount={setAmount}
                        email={email}
                        setEmail={setEmail}
                      />
                      <Routine
                        routine={routine}
                        height={height}
                        weight={weight}
                        goal={goal}
                        date={date}
                        gender={gender}
                        email={email}
                        setHeight={setHeight}
                        setWeight={setWeight}
                        setGoal={setGoal}
                        setDate={setDate}
                        setGender={setGender}
                        setEmail={setEmail}
                      />
                    </div>
                  </header>
                  <div className="w-full items-end flex justify-center">
                    <Button
                      onClick={(e) => handleSubmit(e)}
                      color={"green"}
                      text={"Guardar"}
                    />
                  </div>
                </section>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
