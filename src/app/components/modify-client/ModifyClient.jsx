"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import { emitEvent } from "@/hooks/use-event";
import { useNavigate } from "react-router-dom";
import Loader from "../utils/Loader";

const ModifySelectedClient = ({ selectedClient }) => {
  const [loading, setLoadig] = useState(false);
  const [client, setClient] = useState(null);
  const [gender, setGender] = useState("");
  const [routine, setRoutine] = useState(false);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [goal, setGoal] = useState("");
  const [date, setDate] = useState("");

  const [id, setId] = useState();
  const [name, setName] = useState();
  const [lastname1, setLastname1] = useState();
  const [lastname2, setLastname2] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();

  const [monthlyType, setMothlyType] = useState();
  const [amount, setAmount] = useState(0);
  const { toast } = useToast();

  const navigate = useNavigate();

  const getClient = useCallback(
    async (id) => {
      const response = await makeFetch("/api/clients", "GET", id);
      if (response.status === 200) {
        const data = await response.json();
        setClient(data);
      }
      if (response.status === 500) {
        toast({
          description:
            "Error de conexión, si el problema persiste contacte a soporte", title:"Error"
        });
      }
    },
    [toast]
  );

  useEffect(() => {
    getClient(selectedClient);
  }, [selectedClient, getClient]);

  const setBasicData = useCallback(() => {
    setId(client.cli_id);
    setName(client.cli_name);
    setLastname1(client.cli_last_name1);
    setLastname2(client.cli_last_name2);
    setPhone(client.cli_phone);
    setAmount(client.cli_monthly_payment);
    setRoutine(client.cli_rutine);
    setEmail(client.cli_email);

    let mType = client.cli_monthly_payment_type;
    mType = mType.charAt(0).toUpperCase() + mType.slice(1);
    setMothlyType(mType);
  }, [client]);

  const setAditionalData = useMemo(() => {
    return () => {
      const routineAux = client.cli_rutine;
      if (routineAux) {
        setGender(client.cli_additional_data?.cli_gender || "");
        setHeight(client.cli_additional_data?.cli_height || "");
        setWeight(client.cli_additional_data?.cli_weight || "");
        setDate(client.cli_additional_data?.cli_birthdate || "");
        setGoal(client.cli_additional_data?.cli_goal || "");
      }
    };
  }, [client]);

  useEffect(() => {
    if (client != null) {
      console.log(client);
      setBasicData();
      setAditionalData();
    }
  }, [client, setBasicData, setAditionalData]);

  const validate = (message, status, code, title) => {
    if (status == code) {
      toast({ description: message, title: title });
    }
    if (status == 200) {
      emitEvent("refreshTable", {});
      navigate("/admin/dashboard");
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
        date == "" ||
        email == ""
      ) {
        return true;
      }
    }
    return false;
  };

  const doVerifications = (response) => {
    validate(`El cliente cédula: ${id} ya existe.`, response.status, 401, "Error");
    validate(
      `El correo eléctronico: ${email} ya está registrado`,
      response.status,
      409, "Error"
    );
    validate(
      `El número de teléfono: ${phone} ya está registrado`,
      response.status,
      406, "Error"
    );
    validate(
      `El sistema no encontró una rutina para ${name}`,
      response.status,
      404, "Error"
    );
    validate(
      `Error de conexión, si el problema persiste contacte a soporte.`,
      response.status,
      500, "Error"
    );
    validate(`${name} ha sido modificado.`, response.status, 200);
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

  const handleSubmit = async () => {
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
    setLoadig(true);
    doFechtVerifications(body);
  };

  const doFechtVerifications = async (body) => {
    if (!verifiedValidEmail()) {
      toast({ description: "Correo electrónico no válido" , title:"Error"});
      setLoadig(false);
      return;
    }
    if (verifiedNegative()) {
      toast({ description: "Los números no pueden ser negativos", title:"Error" });
      setLoadig(false);
      return;
    }
    if (verifiedNull()) {
      toast({ description: "Por favor llene todos los campos." , title:"Error"});
      setLoadig(false);

    } else {
      const response = await makeFetch("/api/clients", "PUT", selectedClient, body);
      doVerifications(response);
      setLoadig(false);

    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-adminBackground">
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
            <div className="flex flex-col text-white p-5 w-full">
              <h1 className="text-xl sm:text-2xl mb-2 font-bold text-center">
                Modificar Usuario
              </h1>
                <div className="p-6 sm:p-8 md:p-10 lg:p-12 bg-blueDark text-white rounded-3xl shadow-lg border border-gray-3 w-full">
                <section>
                  <header className="flex flex-col sm:flex-row items-center justify-between">
                    <div className="flex flex-row w-full sm:w-3/4 mb-4 sm:mb-0 gap-10 -mr-28">

                      <BasicInformation
                        modify={true}
                        id={id}
                        name={name}
                        lastname1={lastname1}
                        lastname2={lastname2}
                        phone={phone}
                        amount={amount}
                        monthlyType={monthlyType}
                        routine={routine}
                        email={email}
                        setRoutine={setRoutine}
                        setId={setId}
                        setName={setName}
                        setLastname1={setLastname1}
                        setLastname2={setLastname2}
                        setPhone={setPhone}
                        setMothlyType={setMothlyType}
                        setAmount={setAmount}
                        setEmail={setEmail}
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
                  <div className="w-full items-end flex justify-center gap-4">
                    <Button
                      color={"red"}
                      text={"Cancelar"}
                      onClick={() => navigate("/admin/dashboard")}
                    />
                    <Button
                      onClick={(e) => handleSubmit()}
                      color={"green"}
                      text={"Modificar"}
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
export default ModifySelectedClient;  