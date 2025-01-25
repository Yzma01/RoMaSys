import { PlusCircleIcon, Trash2Icon } from "lucide-react";
import React from "react";
import { deleteClients, saveClients } from "./DevClients";
import { emitEvent } from "@/hooks/use-event";

const DevComponent = ({ open }) => {
  const devData = async () => {
    const response = await saveClients();
    if (response) emitEvent("refreshTable", {});
  };

  const deleteDevData = async () => {
    const response = await deleteClients();
    if (response) emitEvent("refreshTable", {});
  };
  return (
    <div
      className={`flex flex-row justify-center items-center gap-5 p-2 ${
        open ? "flex flex-col" : ""
      }`}
    >
      <div className={`${open ? "flex flex-row gap-2" : ""}`}>
        <PlusCircleIcon
          className="hover:text-green-500 hover:cursor-pointer"
          onClick={devData}
        />
        {open && <p>Agregar</p>}
      </div>
      <div className={`${open ? "flex flex-row gap-2 mt-8" : ""}`}>
        <Trash2Icon
          className="hover:text-red-0 hover:cursor-pointer"
          onClick={deleteDevData}
        />
        {open && <p>Eliminar</p>}
      </div>
    </div>
  );
};

export default DevComponent;
