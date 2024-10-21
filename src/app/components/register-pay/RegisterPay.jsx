import React, { useEffect, useState } from "react";
import { AlertDialogFooter, AlertDialogHeader } from "../ui/alert-dialog";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@radix-ui/react-alert-dialog";
import { makeFetch } from "../utils/fetch";
import RoundButton from "../utils/RoundButton";
import { check, x } from "@/public/icons";
import { format } from "date-fns";
import MonthlyType from "../add-client/MonthlyType";
import FormInput from "../add-client/FormInput";
const RegisterPay = ({ selectedClient }) => {
  console.log(selectedClient);
  const handleSubmit = async () => {
    const body ={
      pay_client_id: selectedClient.client.cli_id,
      pay_date: "",
      pay_amount: amount,
      pay_monthly_payment_type: monthlyType.toLocaleLowerCase()
    }
    console.log(body)
    const response = await makeFetch(
      "/api/payments",
      "POST",
      "",
      body
    );
    console.log(response)
    console.log(response.message)
    
  };
  const [id, setId] = useState("");
  const [fullName, setFullName] = useState("");
  const [nextPayDate, setNextPayDate] = useState("");
  const [monthlyType, setMothlyType] = useState("");
  const [amount, setAmount] = useState("");
  useEffect(() => {
    setId(selectedClient.client.cli_id);
    const fName =
      selectedClient.client.cli_name +
      " " +
      selectedClient.client.cli_last_name1 +
      " " +
      selectedClient.client.cli_last_name2;
    setFullName(fName);
    setNextPayDate(
      format(new Date(selectedClient.client.cli_next_pay_date), "dd-MM-yyyy")
    );

    let mType = selectedClient.client.cli_monthly_payment_type;
    mType = mType.charAt(0).toUpperCase() + mType.slice(1);
    setMothlyType(mType);
  }, []);

  return (
    <div className="p-3 bg-blueDark rounded-3xl shadow-md shadow-blue-400 border-gray-1">
      <AlertDialogHeader>
        <AlertDialogTitle>
          <h1 className="text-[#00ff00] flex text-center justify-center font-bold text-xl pt-5">
            Registrar Pago
          </h1>
        </AlertDialogTitle>
        <AlertDialogDescription>
          <div className="flex flex-row w-[500px]">
            <div className="pl-5 pb-3 flex flex-col">
              <p className="text-gray-500">Cédula</p>
              <p className="pl-5 font-bold">{id}</p>
              <p className="text-gray-500">Nombre Completo</p>
              <p className="pl-5 font-bold">{fullName}</p>
            </div>
            <div className="flex flex-col pl-20">
              <p className="text-gray-500">Próxima fecha de pago.</p>
              <p className="pl-5 font-bold">{nextPayDate}</p>
            </div>
          </div>
          <div className="pl-5 pt-3 flex flex-row">
            <div>
              <p className="text-gray-500">Mensualidad</p>
              <MonthlyType value={monthlyType} />
            </div>
            <div className="pl-20 flex flex-col">
              <p className="text-gray-500 pl-4">Monto a cancelar</p>
              <div className="pl-5">
                <FormInput
                  placeholder={"Monto"}
                  value={amount}
                  setValue={setAmount}
                />
              </div>
            </div>
          </div>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <div className="w-full items-end flex justify-end gap-4 p-3">
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

export default RegisterPay;
