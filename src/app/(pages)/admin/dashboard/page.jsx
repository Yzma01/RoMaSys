import SearchBar from "@/src/app/components/admin-page/SearchBard";
import { ClientsTable } from "@/src/app/components/admin-page/table/Table";
import React from "react";
const clients = [
  {
    id: "0-0000-0000",
    name: "Jorge",
    lastname: "Rojas Mena",
    phone: "0000-0000",
    payDate: "20-09-2024",
  },
  {
    id: "0-0000-0000",
    name: "Jorge",
    lastname: "Rojas Mena",
    phone: "0000-0000",
    payDate: "20-09-2024",
  },
  {
    id: "0-0000-0000",
    name: "Jorge",
    lastname: "Rojas Mena",
    phone: "0000-0000",
    payDate: "20-09-2024",
  },
  {
    id: "0-0000-0000",
    name: "Jorge",
    lastname: "Rojas Mena",
    phone: "0000-0000",
    payDate: "20-09-2024",
  },
  {
    id: "0-0000-0000",
    name: "Jorge",
    lastname: "Rojas Mena",
    phone: "0000-0000",
    payDate: "20-09-2024",
  },
  {
    id: "0-0000-0000",
    name: "Jorge",
    lastname: "Rojas Mena",
    phone: "0000-0000",
    payDate: "20-09-2024",
  },
  {
    id: "0-0000-0000",
    name: "Jorge",
    lastname: "Rojas Mena",
    phone: "0000-0000",
    payDate: "20-09-2024",
  },
  {
    id: "0-0000-0000",
    name: "Jorge",
    lastname: "Rojas Mena",
    phone: "0000-0000",
    payDate: "20-09-2024",
  },
  {
    id: "0-0000-0000",
    name: "Jorge",
    lastname: "Rojas Mena",
    phone: "0000-0000",
    payDate: "20-09-2024",
  },
  {
    id: "0-0000-0000",
    name: "Jorge",
    lastname: "Rojas Mena",
    phone: "0000-0000",
    payDate: "20-09-2024",
  },
  {
    id: "0-0000-0000",
    name: "Jorge",
    lastname: "Rojas Mena",
    phone: "0000-0000",
    payDate: "20-09-2024",
  },
  {
    id: "0-0000-0000",
    name: "Jorge",
    lastname: "Rojas Mena",
    phone: "0000-0000",
    payDate: "20-09-2024",
  },
  {
    id: "0-0000-0000",
    name: "Jorge",
    lastname: "Rojas Mena",
    phone: "0000-0000",
    payDate: "20-09-2024",
  },
  {
    id: "0-0000-0000",
    name: "Jorge",
    lastname: "Rojas Mena",
    phone: "0000-0000",
    payDate: "20-09-2024",
  },
];

export default function Dashboard() {
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
