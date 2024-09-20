"use client";
import SearchBar from "@/src/app/components/admin-page/SearchBar";
import { ClientsTable } from "@/src/app/components/admin-page/table/Table";
import React from "react";
import { useState, useEffect } from "react";

const makeFetch = async (url, method, params, body) => {
  const baseUrl = "http://localhost:3000";
  const apiURL = `${baseUrl + url}${
    params !== undefined || null ? "/" + params : ""
  }`;
  const response = await fetch(url, {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "default",
  });
  if (response.status === 200) {
    return response;
  }
  return -1;
};

export default function Dashboard() {
  const [clients, setClients] = useState([]);
  const [originalClients, setOriginalClients] = useState([]);
  useEffect(() => {
    setClients([]);
    const getClients = async () => {
      const response = await makeFetch("/api/CRUD/clients-repo", "GET", "");
      if (response !== -1) {
        const data = await response.json();
        setClients(data);
        setOriginalClients(data);
      }else{
        alert("Error de conexión, si el problema persiste contacte a soporte")
      }
    };
    getClients();
  }, []);

  const searchClientsByFilter = async (searchValue) => {
    alert(searchValue);
    const response = await makeFetch("/api/Filter/clients", "GET", searchValue);
    if (response !== -1) {
      const data = await response.json();
      setClients(data);
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
                <SearchBar
                  searchClientsByFilter={searchClientsByFilter}
                  searchByNameOrId={searchByNameOrId}
                />
              </div>
            </header>
            <ClientsTable clients={clients} />
          </section>
        </div>
      </div>
    </div>
  );
}
