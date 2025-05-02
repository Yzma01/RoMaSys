"use client";
import { useEvent } from "@/hooks/use-event";
import { Message } from "@mui/icons-material";
import React, { useState } from "react";
import { makeFetch } from "../utils/fetch";
import { useToast } from "@/hooks/use-toast";

const MessageNotification = ({ sidebarOpen }) => {
  const [amountOfMessages, setAmountOfMessages] = useState(0);
  const { toast } = useToast();

  useEvent(
    "refreshNotification",
    (amount) => {
      setAmountOfMessages(amount);
    },
    []
  );

  const handleSubmit = () => {
    if (amountOfMessages == 0 || amountOfMessages == null) {
      toast({
        description: "No hay mensajes pendientes.",
      });
      return;
    }
    setAmountOfMessages(0);
    makeFetch("/api/remainder", "GET", "");
    toast({
      description: `Avisos enviados con éxito: ${amountOfMessages}`,
    });
  };

  return (
    <div className="flex-grow">
      <div
        className="my-8 px-[25%] transition-opacity duration-300 ease-in-out hover:bg-adminBackground flex flex-row items-center relative"
        onClick={handleSubmit}
      >
        <div className="relative px-[8px] py-[16px]">
          <Message />
          {amountOfMessages > 0 && (
            <span
              className={`absolute top-2 left-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md ${
                amountOfMessages > 9 ? "w-6 h-6" : "w-5 h-5"
              }`}
            >
              {amountOfMessages + amountOfMessages > 98
                ? amountOfMessages + "+"
                : amountOfMessages}
            </span>
          )}
        </div>
        {sidebarOpen && <span>{"Mensajes Pendientes"}</span>}
      </div>
    </div>
  );
};

export default MessageNotification;
