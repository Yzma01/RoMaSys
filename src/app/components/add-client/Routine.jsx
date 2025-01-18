import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdditionalInformation from "@/src/app/components/add-client/AdditionalInformation";
const Routine = ({
  routine,
  height,
  setHeight,
  weight,
  setWeight,
  goal,
  setGoal,
  date,
  setDate,
  gender,
  setGender,
  email,
  setEmail
}) => {
  return (
    <div className="p-4">
      <AnimatePresence>
        {routine && (
          <motion.div
            className="overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            <div className="p-4">
              <AdditionalInformation
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Routine;
