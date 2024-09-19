"use client";
import SearchBar from "@/src/app/components/admin-page/SearchBard";
import { ClientsTable } from "@/src/app/components/admin-page/table/Table";
import React from "react";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [clients, setClients] = useState([]);
  useEffect(() => {
    setClients([]);
    const getClients = async () => {
      const response = await fetch("/api/CRUD/clients-repo", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        cache: "default",
      });
      if (response.status === 200) {
        setClients(await response.json());
      }
    };
    getClients();
  }, []);
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen text-white">
        <div className="p-6 sm:p-8 md:p-10 lg:p-12 bg-blueDark text-white rounded-3xl shadow-lg border border-gray-3 max-w-full w-full h-auto mx-4 md:mx-8 lg:mx-16">
          <section>
            <header className="flex flex-col sm:flex-row items-center justify-between">
              <div className="flex flex-col w-full sm:w-3/4 mb-4 sm:mb-0">
                <h1 className="text-xl sm:text-2xl mb-2 font-bold">DASBOARD</h1>
                <p className="text-base sm:text-lg mb-4 text-gray-3 font-light">
                  Hola Niger. ¡Bienvenido de nuevo a RoMaSys!
                </p>
              </div>
              <div className="w-fit sm:w-1/4">
                <SearchBar />
              </div>
            </header>
            <ClientsTable clients={clients} />
          </section>
        </div>
      </div>
    </div>
  );
}
