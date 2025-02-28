"use client";

import { useEvent } from "@/hooks/use-event";
import { GenderChart } from "@/src/app/components/charts/GenderChart";
import { IncomingChart } from "@/src/app/components/charts/IncomingChart";
import { MonthlyTypeChart } from "@/src/app/components/charts/MonthlyTypeChart";
import { NewClientsMonthlyChart } from "@/src/app/components/charts/NewClientsMonthlyChart";
import { makeFetch } from "@/src/app/components/utils/fetch";
import React, { useEffect, useState } from "react";
import { downloadReport } from "@/src/app/components/utils/DownloadReport.js";
import DownloadButton from "@/src/app/components/utils/DownloadButton";

export default function Reports() {
  const [genderData, setGenderData] = useState();
  const [monthlyTypeData, setMonthlyTypeData] = useState();
  const [newClientsData, setNewClientsData] = useState();
  const [lastMontIncoming, setLastMontIncoming] = useState();
  const [date, setDate] = useState("");
  const [filterSelected, setFilterSelected] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await makeFetch("/api/reports", "GET", "");
    if (response.status === 200) {
      const data = await response.json();
      setGenderData(data.amountByGender);
      setNewClientsData(data.amountByMonth);
      setMonthlyTypeData(data.amountByTypeOfMonthlyPayment);
      setLastMontIncoming(data.lastMonthIncoming);
    }
    if (response.status === 500) {
      toast({
        description:
          "Error de conexión, si el problema persiste contacte a soporte",
      });
    }
  };

  useEvent(
    "refreshReports",
    () => {
      getData();
    },
    []
  );

  const handleFilter = async () => {
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
      });
    }
  };

  useEffect(() => {
    handleFilter();
  }, [date, filterSelected]);

  return (
    <div className="h-screen w-full flex flex-col">
      <div className="h-fit flex flex-row justify-between m-10 gap-10">
        <GenderChart data={genderData} />
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
      <div className="flex w-full h-screen flex-col justify-center items-center mt-[-25px]">

      <DownloadButton onClick={() => downloadReport(document.body)}/>
      </div>
    </div>
  );
}
