import React, { useEffect, useState } from "react";
import { AlertDialogFooter, AlertDialogHeader } from "../ui/alert-dialog";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@radix-ui/react-alert-dialog";
import Button from "../utils/Button";
import { makeFetch } from "../utils/fetch";
import RoundButton from "../utils/RoundButton";
import { check, x } from "@/public/icons";
import { emitEvent } from "@/hooks/use-event";
import { useToast } from "@/hooks/use-toast";

const DeleteClient = ({ selectedClient }) => {
  const {toast} = useToast()
  const handleSubmit = async() => {
    const response = await makeFetch("/api/clients", "DELETE", selectedClient.client.cli_id);
    if(response.status === 200){
      emitEvent("refreshTable", {});
      toast({description: `Cliente eliminado con éxito`})
    }else{
      toast({description: 'Error de conexión, si el problema persiste contacte a soporte.'})
    }
    }
  const [id, setId] = useState("");
  const [fullName, setFullName] = useState("");
  useEffect(() => {
    setId(selectedClient.client.cli_id);
    const fName =
      selectedClient.client.cli_name +
      " " +
      selectedClient.client.cli_last_name1 +
      " " +
      selectedClient.client.cli_last_name2;
    setFullName(fName);
  }, []);

  return (
    <div className="p-3 bg-blueDark rounded-3xl shadow-md shadow-blue-400 border-gray-1 w-fit h-fit">
      <AlertDialogHeader>
        <AlertDialogTitle>
          <h1 className="text-red-0 flex text-center justify-center font-bold text-xl pt-5">
            ¿Desea eliminar al cliente?
          </h1>
        </AlertDialogTitle>
        <AlertDialogDescription>
          <div className="pl-5 pb-3">
            <p className="text-gray-500">Cédula</p>
            <p className="pl-5 font-bold">{id}</p>
            <p className="text-gray-500">Nombre Completo</p>
            <p className="pl-5 font-bold">{fullName}</p>
          </div>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <div className="w-full items-end flex justify-between gap-4 p-3">
          <AlertDialogCancel>
            <RoundButton image={x}/>
          </AlertDialogCancel>
          <AlertDialogAction>
            <RoundButton image={check} onClick={()=>handleSubmit()}/>
          </AlertDialogAction>
        </div>
      </AlertDialogFooter>
    </div>
  );
};

export default DeleteClient;
