"use client";
import React, { useState } from "react";
import { AlertDialogFooter, AlertDialogHeader } from "../ui/alert-dialog";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@radix-ui/react-alert-dialog";
import BasicInformation, { Title } from "../add-client/BasicInformation";
import AddClient from "../../(pages)/admin/addClient/page";
import { AnimatePresence, motion } from "framer-motion";
import Routine from "../add-client/Routine";
import Button from "../utils/Button";

const ModifyClient = ({ client }) => {
  const [routine, setRoutine] = useState(client.client.cli_rutine);
  const [height, setHeight] = useState(client.client.cli_height);
  const [weight, setWeight] = useState(client.client.cli_weight);
  const [goal, setGoal] = useState(client.client.cli_goal);
  const [date, setDate] = useState(client.client.cli_date);
  const [gender, setGender] = useState(client.client.cli_gender);
  const [id, setId] = useState(client.client.cli_id);
  const [name, setName] = useState(client.client.cli_name);
  const [lastname1, setLastname1] = useState(client.client.cli_last_name1);
  const [lastname2, setLastname2] = useState(client.client.cli_last_name2);
  const [phone, setPhone] = useState(client.client.cli_phone);
  const [monthlyType, setMothlyType] = useState(
    client.client.cli_monthly_payment_type
  );
  const [amount, setAmount] = useState(0);
  return (
    <div>
      <AlertDialogHeader>
        <AlertDialogDescription>
          <div className=" flex items-center justify-centerw-full">
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
            <Button
              color={"red"}
              text={"Cancelar"}
            />
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
