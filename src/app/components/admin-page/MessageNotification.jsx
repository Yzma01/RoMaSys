"use client";
import { useEvent } from "@/hooks/use-event";
import { Message } from "@mui/icons-material";
import React, { useState } from "react";
import { makeFetch } from "../utils/fetch";

const MessageNotification = ({ sidebarOpen }) => {
  const [amountOfMessages, setAmountOfMessages] = useState(0);
  useEvent(
    "refreshNotification",
    (amount) => {
      setAmountOfMessages(amount);
    },
    []
  );
  return (
    <div className="flex-grow">
      <div
        className="my-8 px-[25%] transition-opacity duration-300 ease-in-out hover:bg-adminBackground flex flex-row items-center relative"
        onClick={() => {
            setAmountOfMessages(0);
            makeFetch("/api/remainder", "GET", "");
          }}
          
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
