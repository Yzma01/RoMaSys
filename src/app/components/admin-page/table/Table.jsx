import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";

import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { ClientAction } from "../ClientsAction";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import AcUnitRoundedIcon from "@mui/icons-material/AcUnitRounded";
import Popover from "../../utils/Popover";
import DeleteClient from "../../delete-client/DeleteClient";
import RegisterPay from "../../register-pay/RegisterPay";
import FreezeClient from "../../freeze-client/FreezeClient";
import ClientHistory from "../client-history/ClientHistory";

export function ClientsTable({ activeClients, dueDateClients, frozenClients }) {
  const navigate = useNavigate();
  const buttons = [
    {
      label: "freeze",
      button: (
        <ClientAction
          logo={AcUnitRoundedIcon}
          className="hover:bg-[#367cff] text-white"
          freeze={true}
        />
      ),
      child: (client) => <FreezeClient selectedClient={client} />,
    },
    {
      label: "pay",
      button: (
        <ClientAction
          logo={LocalAtmOutlinedIcon}
          className="hover:bg-[#00ff00] text-white"
        />
      ),
      child: (client) => <RegisterPay selectedClient={client} />,
    },
    {
      label: "modify",
      button: (
        <ClientAction
          logo={CreateOutlinedIcon}
          className="hover:bg-[#ffff00] text-white"
          onClick={() => navigate(`/admin/modifyClient/${client.cli_id}`)}
        />
      ),
    },
    {
      label: "delete",
      button: (
        <ClientAction
          logo={DeleteOutlineOutlinedIcon}
          className="hover:bg-[#ff0000] text-white"
        />
      ),
      child: (client) => <DeleteClient selectedClient={client} />,
    },
    {
      label: "history",
      button: (
        <ClientAction
          logo={TextSnippetOutlinedIcon}
          className="hover:bg-[#897E7E] text-white"
        />
      ),
      child: (client) => <ClientHistory selectedClient={client} />,
    },
  ];

  const renderButtons = (client) => {
    return (
      <>
        {buttons.map(({ button, child, label }, btnIndex) => (
          <TableCell className="text-center" key={btnIndex}>
            <div className="flex justify-center">
              {label === "modify" ? (
                React.cloneElement(button, {
                  onClick: () =>
                    navigate(`/admin/modifyClient/${client.cli_id}`),
                })
              ) : (
                <Popover button={button} child={child} client={client} />
              )}
            </div>
          </TableCell>
        ))}
      </>
    );
  };

  const renderActiveClients = () => {
    return activeClients.map((client, index) => (
      <TableRow key={index} className="hover:bg-[#11111199] ">
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
        {renderButtons(client)}
      </TableRow>
    ));
  };
  const renderFrozenClients = () => {
    return frozenClients.map((client, index) => (
      <TableRow
        key={index}
        className="hover:bg-[#11111199] text-[#367cff] font-bold"
      >
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
        {renderButtons(client)}
      </TableRow>
    ));
  };
  const renderpastDueClients = () => {
    return dueDateClients.map((client, index) => (
      <TableRow
        key={index}
        className="hover:bg-[#11111199] text-[#ff0000] font-bold"
      >
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
        {renderButtons(client)}
      </TableRow>
    ));
  };

  return (
    <div
      className="max-h-[30vw] overflow-y-auto"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <Table className="w-[70vw]">
        <TableCaption>Clientes</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-[#96E9F4] text-center hidden md:table-cell font-bold">
              Cédula
            </TableHead>
            <TableHead className="text-[#96E9F4] text-center hidden md:table-cell font-bold">
              Nombre
            </TableHead>
            <TableHead className="text-[#96E9F4] text-center hidden md:table-cell font-bold">
              Apellidos
            </TableHead>
            <TableHead className="text-[#96E9F4] text-center hidden md:table-cell font-bold">
              Teléfono
            </TableHead>
            <TableHead className="text-[#96E9F4] text-center hidden md:table-cell font-bold">
              Próximo Pago
            </TableHead>
            <TableHead className="text-[#367cff] text-center hidden md:table-cell font-bold">
              Congelar
            </TableHead>
            <TableHead className="text-[#00FF00] text-center hidden md:table-cell font-bold">
              Pagar
            </TableHead>
            <TableHead className="text-[#FFFF00] text-center hidden md:table-cell font-bold">
              Editar
            </TableHead>
            <TableHead className="text-[#FF0000] text-center hidden md:table-cell font-bold">
              Eliminar
            </TableHead>
            <TableHead className="text-[#897E7E] text-center hidden md:table-cell font-bold">
              Historial
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activeClients && renderActiveClients()}
          {dueDateClients && renderpastDueClients()}
          {frozenClients && renderFrozenClients()}
        </TableBody>
      </Table>
    </div>
  );
}
