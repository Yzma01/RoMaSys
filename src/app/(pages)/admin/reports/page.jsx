"use client";

import { useEvent } from "@/hooks/use-event";
import { GenderChart } from "@/src/app/components/charts/GenderChart";
import { IncomingChart } from "@/src/app/components/charts/IncomingChart";
import { MonthlyTypeChart } from "@/src/app/components/charts/MonthlyTypeChart";
import { NewClientsMonthlyChart } from "@/src/app/components/charts/NewClientsMonthlyChart";
import { makeFetch } from "@/src/app/components/utils/fetch";
import React, { useEffect, useState } from "react";

export default function Reports() {
  const [genderData, setGenderData] = useState()
  const [monthlyTypeData, setMonthlyTypeData] = useState()
  const [newClientsData, setNewClientsData] = useState()
  const [lastMontIncoming, setLastMontIncoming] = useState()

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await makeFetch("/api/reports", "GET", "");
    if (response.status === 200) {
      const data = await response.json();
      console.log(data)
      setGenderData(data.amountByGender)
      setNewClientsData(data.amountByMonth)
      setMonthlyTypeData(data.amountByTypeOfMonthlyPayment)
      setLastMontIncoming(data.lastMonthIncoming)
    }
    if (response.status === 500) {
      toast({
        description:
          "Error de conexión, si el problema persiste contacte a soporte",
      });
    }
  };

  useEvent("refreshReports", () => {
      getData();
    }, []);

  return (
    <div className="h-screen w-full flex flex-col">
      <div className="h-fit flex flex-row justify-between m-10 gap-10">
        <GenderChart data={genderData}/>
        <MonthlyTypeChart data={monthlyTypeData}/>
        <NewClientsMonthlyChart data={newClientsData}/>
      </div>
      <div>
        <IncomingChart data={lastMontIncoming}/>
      </div>
    </div>
  );
}
