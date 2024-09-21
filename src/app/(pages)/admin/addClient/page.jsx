import BasicInformation from "@/src/app/components/add-client/BasicInformation";
import React from "react";

export default function AddClient() {
  return (
    <div className="bg-adminBackground">
      <div className="items-center justify-center min-h-screen text-white flex flex-col p-5">
        <h1 className="text-xl sm:text-2xl mb-2 font-bold flex text-start w-full pl-3">
          Agregar Usuario
        </h1>
        <div className="p-6 sm:p-8 md:p-10 lg:p-12 bg-blueDark text-white rounded-3xl shadow-lg border border-gray-3 max-w-full w-full h-auto mx-4 md:mx-8 lg:mx-16">
          <section>
            <header className="flex flex-col sm:flex-row items-center justify-between">
              <div className="flex flex-col w-full sm:w-3/4 mb-4 sm:mb-0">
                <BasicInformation />
              </div>
            </header>
          </section>
        </div>
      </div>
    </div>
  );
}
