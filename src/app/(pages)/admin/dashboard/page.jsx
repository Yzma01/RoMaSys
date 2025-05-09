"use client";
import SearchBar from "@/src/app/components/admin-page/SearchBar";
import { ClientsTable } from "../../../components/admin-page/table/Table";
import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import { makeFetch } from "@/src/app/components/utils/fetch";
import { AnimatePresence, motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { emitEvent, useEvent } from "@/hooks/use-event";
import { isBefore } from "date-fns";
import {
  deleteClients,
  saveClients,
} from "../../../components/utils/DevClients";
import DevComponent from "@/src/app/components/utils/DevComponent";
import Loader from "@/src/app/components/utils/Loader";

export default function Dashboard() {
  const [clients, setClients] = useState([]);
  const [originalClients, setOriginalClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const activeClients = [];
  const frozenClients = [];
  const dueDateClients = [];
  const { toast } = useToast();

  useEvent(
    "refreshTable",
    ({ filter }) => {
      getClients();
      filterClients();
    },
    []
  );

  const filterClients = () => {
    clients.forEach((client) => {
      if (client.cli_frozen) {
        frozenClients.push(client);
      } else if (isBefore(new Date(client.cli_next_pay_date), new Date())) {
        dueDateClients.push(client);
      } else {
        activeClients.push(client);
      }
    });
  };

  filterClients();

  const getClients = useCallback(async () => {
    setIsLoading(true);
    const response = await makeFetch("/api/clients", "GET", "");
    if (response.status === 200) {
      const data = await response.json();
      setClients(data.clients);
      emitEvent("refreshNotification", data.pendingNotices);
      setOriginalClients(data.clients);
    }
    if (response.status === 500) {
      toast({
        description:
          "Error de conexión, si el problema persiste contacte a soporte", title: "Error"
      });s
    }
    setIsLoading(false);
  }, [toast]);
  
  useEffect(() => {
    setClients([]);
    getClients();
  }, [getClients]);
  

  const searchClientsByFilter = async (searchValue) => {
    if (searchValue === "") {
      setClients(originalClients);
      return;
    } else {
      const response = await makeFetch(
        `/api/filter/clients?filterType=${searchValue.toLowerCase()}`,
        "GET",
        ""
      );
      if (response.status === 200) {
        const data = await response.json();
        setClients(data);
        filterClients();
      }
      if (response.status === 500) {
        toast({
          description:
            "Error de conexión, si el problema persiste contacte a soporte", title: "Error"
        });
      }
    }
  };

  const searchByNameOrId = (searchValue) => {
    if (searchValue === "") {
      setClients(originalClients);
    } else {
      setClients(
        originalClients.filter((client) => {
          const fullName =
            `${client.cli_name} ${client.cli_last_name1} ${client.cli_last_name2}`.toLowerCase();
          const searchTerm = searchValue.toLowerCase();

          return (
            fullName.includes(searchTerm) ||
            client.cli_id.toLowerCase().includes(searchTerm)
          );
        })
      );
    }
  };

  return (
    <div className="min-h-screen w-full bg-adminBackground flex items-center justify-center">
      <div className="h-full text-white flex items-center justify-center">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="w-full h-full">
            <AnimatePresence>
              <motion.div
                className="overflow-hidden"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 1.5 }}
              >
                <div className="flex items-center justify-center w-full h-full text-white">
                  <div className="p-6 sm:p-8 md:p-10 lg:p-12 bg-blueDark text-white rounded-3xl shadow-lg border border-gray-3 h-auto md:mx-8 lg:mx-16">
                    <section>
                      <header className="flex flex-col sm:flex-row items-center justify-between w-full">
                        <div className="flex flex-col w-full sm:w-3/4 mb-4 sm:mb-0">
                          <h1 className="text-xl sm:text-2xl mb-2 font-bold">
                            DASHBOARD
                          </h1>
                          <p className="text-base sm:text-lg mb-4 text-gray-3 font-light">
                            Hola Niger. ¡Bienvenido de nuevo a RoMaSys!
                          </p>
                        </div>
                        <div className="w-fit sm:w-1/4">
                          <SearchBar
                            searchClientsByFilter={searchClientsByFilter}
                            searchByNameOrId={searchByNameOrId}
                          />
                        </div>
                      </header>
                      <ClientsTable
                        activeClients={activeClients}
                        dueDateClients={dueDateClients}
                        frozenClients={frozenClients}
                      />
                    </section>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}  