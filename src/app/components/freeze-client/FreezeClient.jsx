import React, { useEffect, useState } from "react";
import { AlertDialogFooter, AlertDialogHeader } from "../ui/alert-dialog";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@radix-ui/react-alert-dialog";
import { check, x } from "@/public/icons";
import RoundButton from "../utils/RoundButton";
import { useToast } from "@/hooks/use-toast";
import { makeFetch } from "../utils/fetch";
import { emitEvent } from "@/hooks/use-event";

const FreezeClient = ({ selectedClient }) => {
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
    if(status == 200){
      emitEvent("refreshTable", {});
    }
    return;
  };

  const doVerifications = (response) => {
    validate(`${name} ha sido ${client.cli_frozen?"descongelado":"congelado"}.`, response.status, 200);
    validate(
      `Error de conexión, si el problema persiste contacte a soporte.`,
      response.status,
      500
    );
    validate(`El cliente cédula: ${id} tiene un pago pendiente.`, response.status, 402);
  };

  const handleSubmit = async (event) => {
    const body = {
      cli_name: name,
      cli_last_name1: lastname1,
      cli_last_name2: lastname2,
      cli_monthly_payment_type: monthlyType.toLowerCase(),
      cli_phone: phone,
      cli_frozen: !selectedClient.client.cli_frozen,
      cli_remaining_days: selectedClient.client.cli_remaining_days,
      cli_register_date: selectedClient.client.cli_register_date,
      cli_rutine: routine,
      cli_next_pay_date: selectedClient.client.cli_next_pay_date,
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
    const response = await makeFetch("/api/clients", "PUT", id, body);
    doVerifications(response);
  };
  return (
    <div className="p-3 bg-blueDark rounded-3xl shadow-md shadow-blue-400 border-gray-1 w-fit h-fit">
      <AlertDialogHeader>
        <AlertDialogTitle>
          <h1 className="text-[#367cff] flex text-center justify-center font-bold text-xl pt-5">
            ¿Desea 
            {client.cli_frozen?" descongelar ":" congelar "}
             al cliente?
          </h1>
        </AlertDialogTitle>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <div className="w-full items-end flex justify-between gap-4 p-3">
          <AlertDialogCancel>
            <RoundButton image={x} />
          </AlertDialogCancel>
          <AlertDialogAction>
            <RoundButton image={check} onClick={() => handleSubmit()} />
          </AlertDialogAction>
        </div>
      </AlertDialogFooter>
    </div>
  );
};

export default FreezeClient;
