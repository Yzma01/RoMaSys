"use client";
import React, { useEffect, useState } from "react";
import { AlertDialogFooter, AlertDialogHeader } from "../ui/alert-dialog";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@radix-ui/react-alert-dialog";
import BasicInformation from "../add-client/BasicInformation";
import { AnimatePresence, motion } from "framer-motion";
import Routine from "../add-client/Routine";
import Button from "../utils/Button";
import { useToast } from "@/hooks/use-toast";
import { makeFetch } from "../utils/fetch";

const ModifyClient = ({ selectedClient }) => {
  const client = selectedClient.client;
  const [gender, setGender] = useState("");
  const [routine, setRoutine] = useState(client.cli_rutine);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [goal, setGoal] = useState("");
  const [date, setDate] = useState("");

  const [id, setId] = useState(client.cli_id);
  const [name, setName] = useState(client.cli_name);
  const [lastname1, setLastname1] = useState(client.cli_last_name1);
  const [lastname2, setLastname2] = useState(client.cli_last_name2);
  const [phone, setPhone] = useState(client.cli_phone);
  let mType = client.cli_monthly_payment_type;
  mType = mType.charAt(0).toUpperCase() + mType.slice(1);
  const [monthlyType, setMothlyType] = useState(mType);
  const [amount, setAmount] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    if (routine) {
      setGender(client.cli_additional_data.cli_gender);
      setRoutine(client.cli_rutine);
      setHeight(client.cli_additional_data.cli_height);
      setWeight(client.cli_additional_data.cli_weight);
      setDate(client.cli_additional_data.cli_birthdate);
      setGoal(client.cli_additional_data.cli_goal);
    }
  }, [client]);

  const validate = (message, status, code, className) => {
    if (status == code) {
      toast({ description: message, className: className });
    }
    if (code == 200) {
      window.location.reload();
    }
    return;
  };

  const verifiedNull = () => {
    if (
      id == "" ||
      name == "" ||
      lastname1 == "" ||
      lastname2 == "" ||
      phone == "" ||
      monthlyType == ""
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
    validate(`${name} ha sido modificado.`, response.status, 200);
    validate(
      `Error de conexión, si el problema persiste contacte a soporte.`,
      response.status,
      500
    );
    validate(`El cliente cédula: ${id} ya existe.`, response.status, 401);
    validate(
      `El número de teléfono: ${phone} ya está registrado`,
      response.status,
      406
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const body = {
      cli_name: name,
      cli_last_name1: lastname1,
      cli_last_name2: lastname2,
      cli_monthly_payment_type: monthlyType.toLowerCase(),
      cli_phone: phone,
      cli_frozen: false,
      cli_remaining_days: 0,
      cli_register_date: new Date(),
      cli_rutine: routine,
      cli_next_pay_date: "",
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
    if (verifiedNull()) {
      toast({ description: "Por favor llene todos los campos." });
    } else {
      const response = await makeFetch("/api/clients", "PUT", id, body);
      doVerifications(response);
    }
  };

  return (
    <div className=" w-[100w]">
      <AlertDialogHeader>
        <AlertDialogTitle></AlertDialogTitle>
        <AlertDialogDescription>
          <div className="flex items-center justify-center w-full">
            <AnimatePresence>
              <motion.div
                className="overflow-hidden"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 1.5 }}
              >
                <div className="flex flex-col  text-white p-5 w-fit">
                  <h1 className="text-xl sm:text-2xl mb-2 font-bold">
                    Modificar Usuario
                  </h1>
                  <div className="p-6 sm:p-8 md:p-10 lg:p-12 bg-blueDark text-white rounded-3xl shadow-lg border border-gray-3 w-fit mx-4 md:mx-8 lg:mx-16">
                    <section>
                      <header className="flex flex-col sm:flex-row items-center justify-between">
                        <div className="flex flex-row w-fit sm:w-3/4 mb-4 sm:mb-0 gap-10 -mr-28">
                          <BasicInformation
                            id={id}
                            name={name}
                            lastname1={lastname1}
                            lastname2={lastname2}
                            phone={phone}
                            amount={amount}
                            monthlyType={monthlyType}
                            routine={routine}
                            setRoutine={setRoutine}
                            setId={setId}
                            setName={setName}
                            setLastname1={setLastname1}
                            setLastname2={setLastname2}
                            setPhone={setPhone}
                            setMothlyType={setMothlyType}
                            setAmount={setAmount}
                          />
                          <Routine
                            routine={routine}
                            height={height}
                            weight={weight}
                            goal={goal}
                            date={date}
                            gender={gender}
                            setHeight={setHeight}
                            setWeight={setWeight}
                            setGoal={setGoal}
                            setDate={setDate}
                            setGender={setGender}
                          />
                        </div>
                      </header>
                    </section>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <div className="w-full items-end flex justify-center gap-4">
          <AlertDialogCancel>
            <Button color={"red"} text={"Cancelar"} />
          </AlertDialogCancel>
          <AlertDialogAction>
            <Button
              onClick={(e) => handleSubmit(e)}
              color={"green"}
              text={"Modificar"}
            />
          </AlertDialogAction>
        </div>
      </AlertDialogFooter>
    </div>
  );
};

export default ModifyClient;
