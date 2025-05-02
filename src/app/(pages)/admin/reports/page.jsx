"use client";

import { useEvent } from "@/hooks/use-event";
import { IncomingChart } from "@/src/app/components/charts/IncomingChart";
import { MonthlyTypeChart } from "@/src/app/components/charts/MonthlyTypeChart";
import { NewClientsMonthlyChart } from "@/src/app/components/charts/NewClientsMonthlyChart";
import { makeFetch } from "@/src/app/components/utils/fetch";
import React, { useCallback, useEffect, useState } from "react";
import { downloadReport } from "@/src/app/components/utils/DownloadReport.js";
import DownloadButton from "@/src/app/components/utils/DownloadButton";
import { useToast } from "@/hooks/use-toast";
import { RoutineChart } from "@/src/app/components/charts/RoutineChart";

export default function Reports() {
  const [routineData, setRoutineData] = useState();
  const [monthlyTypeData, setMonthlyTypeData] = useState();
  const [newClientsData, setNewClientsData] = useState();
  const [lastMontIncoming, setLastMontIncoming] = useState();
  const [date, setDate] = useState("");
  const [filterSelected, setFilterSelected] = useState("");
  const { toast } = useToast();

  const getData = useCallback(async () => {
    const response = await makeFetch("/api/reports", "GET", "");
    if (response.status === 200) {
      const data = await response.json();
      setRoutineData(data.amountByWithAndWithoutRoutine);
      setNewClientsData(data.amountByMonth);
      setMonthlyTypeData(data.amountByTypeOfMonthlyPayment);
      setLastMontIncoming(data.lastMonthIncoming);
    }
    if (response.status === 500) {
      toast({
        description:
          "Error de conexión, si el problema persiste contacte a soporte",
        title: "Error",
      });
    }
  }, [toast]);

  useEffect(() => {
    getData();
  }, [getData]);

  useEvent(
    "refreshReports",
    () => {
      getData();
    },
    []
  );

  const handleFilter = useCallback(async () => {
    const params = new URLSearchParams({
      startDate: date?.from || "",
      endDate: date?.to || "",
      monthlyPaymentType: filterSelected || "",
    });

    const response = await makeFetch(
      `/api/reports/incomingByRange?${params}`,
      "GET",
      ""
    );

    if (response.status === 200) {
      const data = await response.json();
      setLastMontIncoming(data);
    }
    if (response.status === 500) {
      toast({
        description:
          "Error de conexión, si el problema persiste contacte a soporte",
        title: "Error",
      });
    }
  }, [date, filterSelected, toast]); // Dependencias necesarias

  useEffect(() => {
    handleFilter();
  }, [handleFilter]);
  
  return (
    <div className="min-h-screen w-full flex flex-col">
      <div className="flex flex-row justify-between m-10 gap-10 w-full max-w-screen-lg mx-auto">
        <RoutineChart data={routineData} />
        <MonthlyTypeChart data={monthlyTypeData} />
        <NewClientsMonthlyChart data={newClientsData} />
      </div>
      <div>
        <IncomingChart
          data={lastMontIncoming}
          date={date}
          setDate={setDate}
          filterSelected={filterSelected}
          setFilterSelected={setFilterSelected}
          handleFilter={() => handleFilter}
        />
      </div>
      <div className="flex w-full h-fit flex-col justify-center items-center mt-[-25px]">
        <DownloadButton
          onClick={() => setTimeout(() => downloadReport(document.body), 4000)}
        />
      </div>
    </div>
  );
}
