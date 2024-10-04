"use client";
import BasicInformation from "@/src/app/components/add-client/BasicInformation";
import React, { useState } from "react";
import Routine from "@/src/app/components/add-client/Routine";
import { AnimatePresence, motion } from "framer-motion";

export default function AddClient() {
  const [routine, setRoutine] = useState(false);

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [goal, setGoal] = useState("");
  const [date, setDate] = useState("");
  const [gender, setGender] = useState("");
  return (
    <div className="bg-adminBackground flex items-center justify-center h-[100vh] w-full">
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
              Agregar Usuario
            </h1>
            <div className="p-6 sm:p-8 md:p-10 lg:p-12 bg-blueDark text-white rounded-3xl shadow-lg border border-gray-3 w-fit mx-4 md:mx-8 lg:mx-16">
              <section>
                <header className="flex flex-col sm:flex-row items-center justify-between">
                  <div className="flex flex-row w-fit sm:w-3/4 mb-4 sm:mb-0 gap-10 -mr-28">
                    <BasicInformation
                      routine={routine}
                      height={height}
                      weight={weight}
                      goal={goal}
                      date={date}
                      gender={gender}
                      setRoutine={setRoutine}
                      setHeight={setHeight}
                      setWeight={setWeight}
                      setGoal={setGoal}
                      setDate={setDate}
                      setGender={setGender}
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
  );
}
