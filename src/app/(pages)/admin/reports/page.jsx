import { GenderChart } from "@/src/app/components/charts/GenderChart";
import { IncomingChart } from "@/src/app/components/charts/IncomingChart";
import { MonthlyTypeChart } from "@/src/app/components/charts/MonthlyTypeChart";
import { NewClientsMonthlyChart } from "@/src/app/components/charts/NewClientsMonthlyChart";
import React from "react";

export default function Reports() {
  return (
    <div className="h-screen w-full flex flex-col">
      <div className="h-fit flex flex-row justify-between">
        <GenderChart />
        <MonthlyTypeChart />
        <NewClientsMonthlyChart />
      </div>
      <div>
        <IncomingChart />
      </div>
    </div>
  );
}
