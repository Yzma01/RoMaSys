import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { format } from "date-fns";

import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { ClientAction } from "../ClientsAction";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import AcUnitRoundedIcon from "@mui/icons-material/AcUnitRounded";
import { makeFetch } from "../../utils/fetch";
import Popover from "../../utils/Popover";
import { button } from "@nextui-org/theme";
import ModifyClient from "../../modify-client/ModifyClient";

export function ClientsTable({ clients }) {
  const getClassName = (color) => {
    return `text-[#${
      color == undefined ? "96E9F4" : color
    }] text-center hidden md:table-cell font-bold`;
  };

  const buttons = [
    {
      button: (
        <ClientAction
          logo={AcUnitRoundedIcon}
          onClick={() => alert("History clicked")}
          className="hover:bg-[#367cff] text-white"
        />
      ),
    },
    {
      button: (
        <ClientAction
          logo={LocalAtmOutlinedIcon}
          onClick={() => alert("Pay clicked")}
          className="hover:bg-[#00ff00] text-white"
        />
      ),
    },
    {
      button: (
        <ClientAction
          logo={CreateOutlinedIcon}
          className="hover:bg-[#ffff00] text-white"
        />
      ),
      child: (client)=> <ModifyClient client={client}/>
    },
    {
      button: (
        <ClientAction
          logo={DeleteOutlineOutlinedIcon}
          onClick={() => {
            makeFetch("/api/clients", "DELETE", cli_id);
            window.location.reload();
          }}
          className="hover:bg-[#ff0000] text-white"
        />
      ),
    },
    {
      button: (
        <ClientAction
          logo={TextSnippetOutlinedIcon}
          onClick={() => alert("History clicked")}
          className="hover:bg-[#897E7E] text-white"
        />
      ),
    },
  ];

  return (
    <div
      className="max-h-[30vw] overflow-y-auto"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <Table className="min-w-full">
        <TableCaption>Clientes</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className={getClassName()}>Cédula</TableHead>
            <TableHead className={getClassName()}>Nombre</TableHead>
            <TableHead className={getClassName()}>Apellidos</TableHead>
            <TableHead className={getClassName()}>Teléfono</TableHead>
            <TableHead className={getClassName()}>Fecha de Pago</TableHead>
            <TableHead className={getClassName("367cff")}>Congelar</TableHead>
            <TableHead className={getClassName("00FF00")}>Pagar</TableHead>
            <TableHead className={getClassName("FFFF00")}>Editar</TableHead>
            <TableHead className={getClassName("FF0000")}>Eliminar</TableHead>
            <TableHead className={getClassName("897E7E")}>Historial</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map(
            (
              client,
              index
            ) => (
              <TableRow key={index} className="hover:bg-[#11111199]">
                <TableCell className="text-center hidden md:table-cell">
                  {client.cli_id}
                </TableCell>
                <TableCell className="text-center hidden md:table-cell">
                  {client.cli_name}
                </TableCell>
                <TableCell className="text-center hidden md:table-cell">
                  {client.cli_last_name1 + " " + client.cli_last_name2}
                </TableCell>
                <TableCell className="text-center hidden md:table-cell">
                  {client.cli_phone}
                </TableCell>
                <TableCell className="text-center hidden md:table-cell">
                  {format(new Date(client.cli_next_pay_date), "dd-MM-yyyy")}
                </TableCell>

                {buttons.map(({ button, child }, index) => (
                  <TableCell className="text-center" key={index}>
                    <div className="flex justify-center">
                      <Popover button={button} child={child} client={client}/>
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
}
