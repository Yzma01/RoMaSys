"use client";
import SearchBar from "@/src/app/components/admin-page/SearchBar";
import { ClientsTable } from "@/src/app/components/admin-page/table/Table";
import React from "react";
import { useState, useEffect } from "react";
import { makeFetch } from "@/src/app/components/utils/fetch";
import { AnimatePresence, motion } from "framer-motion";

export default function Dashboard() {
  const [clients, setClients] = useState([]);
  const [originalClients, setOriginalClients] = useState([]);
  useEffect(() => {
    setClients([]);
    const getClients = async () => {
      const response = await makeFetch(
        "/api/CRUD/clients-repo",
        "GET",
        "",
        process.env.BASE_URL
      );
      if (response.status === 200) {
        const data = await response.json();
        setClients(data);
        setOriginalClients(data);
      }
      if (response.status === 500) {
        alert("Error de conexión, si el problema persiste contacte a soporte");
      }
    };
    getClients();
  }, []);

  const searchClientsByFilter = async (searchValue) => {
    console.log(searchValue);
    if (searchValue === "") {
      console.log(originalClients);
      setClients(originalClients);
    } else {
      const response = await makeFetch(
        `/api/Filter/clients?filterType=${searchValue.toLowerCase()}`,
        "GET",
        "",
        process.env.BASE_URL
      );
      if (response.status === 200) {
        const data = await response.json();
        setClients(data);
      }
      if (response.status === 500) {
        alert("Error de conexión, si el problema persiste contacte a soporte");
      }
    }
  };

  const searchByNameOrId = (searchValue) => {
    if (searchValue === "") {
      setClients(originalClients);
    } else {
      setClients(
        originalClients.filter(
          (client) =>
            client.cli_name.toLowerCase().includes(searchValue.toLowerCase()) ||
            client.cli_id.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    }
  };
  return (
    <div>
      <div className="flex items-center justify-center h-[100vh] text-white">
        <AnimatePresence>
          <motion.div
            className="overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            <div className="p-6 sm:p-8 md:p-10 lg:p-12 bg-blueDark text-white rounded-3xl shadow-lg border border-gray-3 max-w-full w-full h-auto mx-4 md:mx-8 lg:mx-16">
              <section>
                <header className="flex flex-col sm:flex-row items-center justify-between">
                  <div className="flex flex-col w-full sm:w-3/4 mb-4 sm:mb-0">
                    <h1 className="text-xl sm:text-2xl mb-2 font-bold">
                      DAShBOARD
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
                <ClientsTable clients={clients} />
              </section>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
