import React, { useEffect, useState } from "react";

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@radix-ui/react-alert-dialog";
import { AlertDialogFooter, AlertDialogHeader } from "../../ui/alert-dialog";
import RoundButton from "../../utils/RoundButton";
import { check, x } from "@/public/icons";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { makeFetch } from "../../utils/fetch";
import { format } from "date-fns";

const ClientHistory = ({ selectedClient }) => {
  const [id, setId] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [clientHistory, setClientHistory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const fName =
      selectedClient.client.cli_name +
      " " +
      selectedClient.client.cli_last_name1 +
      " " +
      selectedClient.client.cli_last_name2;
    setFullName(fName);
    setId(selectedClient.client.cli_id);
    setPhone(selectedClient.client.cli_phone);

    const fetchHistory = async () => {
      try {
        const history = await getClientHistory();
        setClientHistory(await history.json());
      } catch (error) {
        console.error("Error fetching client history", error);
        setClientHistory(null);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [selectedClient]);

  const getClientHistory = async () => {
    const response = await makeFetch(
      "/api/payments",
      "GET",
      selectedClient.client.cli_id
    );
    if (response.status === 404) {
      return null;
    }
    return response;
  };

  const renderClientHistory = () => {
    if (loading) {
      return <p className="text-center pt-5 text-lg">Cargando historial...</p>;
    }

    if (!clientHistory || clientHistory.length === 0) {
      return (
        <p className="text-center pt-5 text-lg">
          El cliente no posee historial de pagos
        </p>
      );
    }

    return (
      <div
        className="max-h-[30vw] overflow-y-auto pt-5"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <Table className="min-w-full">
          <TableCaption>Historial</TableCaption>
          <TableHeader className="bg-[#18181a] sticky">
            <TableRow>
              <TableHead className="text-white text-center hidden md:table-cell font-bold">
                Fecha
              </TableHead>
              <TableHead className="text-white text-center hidden md:table-cell font-bold">
                Tipo de Mensualidad
              </TableHead>
              <TableHead className="text-white text-center hidden md:table-cell font-bold">
                Monto
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clientHistory.map((client, index) => (
              <TableRow key={index}>
                <TableCell className="text-center hidden md:table-cell">
                  {format(new Date(client.pay_date), "dd-MM-yyyy")}
                </TableCell>
                <TableCell className="text-center hidden md:table-cell">
                  {client.pay_monthly_payment_type}
                </TableCell>
                <TableCell className="text-center hidden md:table-cell">
                  {client.pay_amount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };
  return (
    <div className="p-3 bg-blueDark rounded-3xl shadow-md shadow-blue-400 border-gray-1 w-fit h-fit">
      <AlertDialogHeader>
        <AlertDialogTitle>
          <h1 className="text-white flex text-center justify-center font-bold text-xl pt-5">
            Historial del cliente
          </h1>
        </AlertDialogTitle>
        <AlertDialogDescription>
          <div className="flex flex-row w-[500px] justify-between">
            <div className="pl-5 pb-3 flex flex-col">
              <p className="text-gray-500">Cédula</p>
              <p className="pl-5 font-bold">{id}</p>
            </div>

            <div className="pl-5 pb-3 flex flex-col">
              <p className="text-gray-500">Nombre Completo</p>
              <p className="pl-5 font-bold">{fullName}</p>
            </div>
            <div className="pl-5 pb-3 flex flex-col">
              <p className="text-gray-500">Teléfono</p>
              <p className="pl-5 font-bold">{phone}</p>
            </div>
          </div>
          <div>
            <p className="font-bold pl-5 pt-5 text-gray-500">
              Historial de pagos
            </p>
            {renderClientHistory()}
          </div>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <div className="w-full items-end flex justify-end gap-4 p-3">
          <AlertDialogCancel>
            <RoundButton image={check} />
          </AlertDialogCancel>
        </div>
      </AlertDialogFooter>
    </div>
  );
};

export default ClientHistory;
