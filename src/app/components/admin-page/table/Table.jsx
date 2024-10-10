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
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { ClientAction } from "../ClientsAction";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import { makeFetch } from "../../utils/fetch";

export function ClientsTable({ clients }) {
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
              Fecha de Pago
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
          {clients.map(
            (
              {
                cli_id,
                cli_name,
                cli_last_name1,
                cli_last_name2,
                cli_phone,
                cli_next_pay_date,
              },
              index
            ) => (
              <TableRow key={index}>
                <TableCell className="text-center hidden md:table-cell">
                  {cli_id}
                </TableCell>
                <TableCell className="text-center hidden md:table-cell">
                  {cli_name}
                </TableCell>
                <TableCell className="text-center hidden md:table-cell">
                  {cli_last_name1 + " " + cli_last_name2}
                </TableCell>
                <TableCell className="text-center hidden md:table-cell">
                  {cli_phone}
                </TableCell>
                <TableCell className="text-center hidden md:table-cell">
                  {format(new Date(cli_next_pay_date), "dd-MM-yyyy")}
                </TableCell>

                <TableCell className="text-center">
                  <div className="flex justify-center">
                    <ClientAction
                      logo={LocalAtmOutlinedIcon}
                      onClick={() => alert("Pay clicked")}
                      className="hover:bg-[#00ff00] text-white"
                    />
                  </div>
                </TableCell>

                <TableCell className="text-center">
                  <div className="flex justify-center">
                    <ClientAction
                      logo={CreateOutlinedIcon}
                      onClick={() => alert("Edit clicked")}
                      className="hover:bg-[#ffff00] text-white"
                    />
                  </div>
                </TableCell>

                <TableCell className="text-center">
                  <div className="flex justify-center">
                    <ClientAction
                      logo={DeleteOutlineOutlinedIcon}
                      onClick={() => {
                        makeFetch("/api/clients", "DELETE", cli_id, )
                        window.location.reload();

                      }}
                      className="hover:bg-[#ff0000] text-white"
                    />
                  </div>
                </TableCell>

                <TableCell className="text-center">
                  <div className="flex justify-center">
                    <ClientAction
                      logo={TextSnippetOutlinedIcon}
                      onClick={() => alert("History clicked")}
                      className="hover:bg-[#897E7E] text-white"
                    />
                  </div>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
}
